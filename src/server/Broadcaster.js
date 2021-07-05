const EventEmitter = require("events").EventEmitter;
const csvParse = require("csv-parse");
const fs = require("fs");
const Writable = require("stream").Writable;

class Broadcaster extends EventEmitter {
    constructor() {
        super();
    }

    start() {
        // Read csv file
        const boundsFile = fs.createReadStream("./meta/bounds.csv");
        const bounds = [];
        // Parse csv and push to variable
        boundsFile
            .pipe(
                csvParse({
                    delimiter: ",",
                    columns: true,
                    cast: true,
                })
            )
            .on("data", (r) => {
                bounds.push(r);
            });
        // Read csv file
        const restrictedAreasFile = fs.createReadStream("./meta/areas.csv");
        const restrictedAreas = [];
        // Parse csv and push to variable
        restrictedAreasFile
            .pipe(
                csvParse({
                    delimiter: ",",
                    columns: true,
                    cast: true,
                })
            )
            .on("data", (r) => {
                restrictedAreas.push(r);
            });
        let restrictedArea = {};
        let speedViolation = {};
        this.broadcasting = true;
        const broadcast = () => {
            console.log("Broadcasting...");
            const fileStream = fs.createReadStream("./meta/route.csv");

            fileStream
                // Filestream piped to csvParse which accept nodejs readablestreams and parses each line to a JSON object
                .pipe(csvParse({ delimiter: ",", columns: true, cast: true }))
                // Then it is piped to a writable streams that will push it into nats
                .pipe(
                    new Writable({
                        objectMode: true,
                        write: (obj, enc, cb) => {
                            // Split the GPS data to an array
                            const location = obj.gps.split("|");
                            obj.violations = [];
                            // Find current location bound and check max speed on this bound
                            bounds.forEach((bound) => {
                                if (
                                    location[0] >= bound.minlat &&
                                    location[0] < bound.maxlat &&
                                    location[1] >= bound.minlng &&
                                    location[1] < bound.maxlng
                                ) {
                                    // Check if vehicle current speed is greater than bound max speed push that as a violation
                                    if (
                                        obj.speed &&
                                        obj.speed > bound.maxspeed
                                    ) {
                                        // Check if speedViolation is empty push the speed
                                        if (
                                            Object.keys(speedViolation)
                                                .length === 0
                                        ) {
                                            speedViolation = {
                                                title: bound.title,
                                                allowed: bound.maxspeed,
                                                speed: obj.speed,
                                            };
                                        } else {
                                            // If speedViolation is not empty and speed is greater than max speed in this violation update speed
                                            if (
                                                obj.speed > speedViolation.speed
                                            ) {
                                                speedViolation = {
                                                    ...speedViolation,
                                                    speed: obj.speed,
                                                };
                                            }
                                        }
                                    } else {
                                        // If speed comes down of max speed of this bound push the speed violation to violations array
                                        if (
                                            obj.speed &&
                                            Object.keys(speedViolation).length >
                                                0
                                        ) {
                                            // Push violation to status object
                                            obj.violations.push({
                                                speed: speedViolation,
                                            });
                                            // Reset speedViolation object
                                            speedViolation = {};
                                        }
                                    }
                                }
                            });
                            // Check the vehicle current location is in a restricted area?
                            restrictedAreas.forEach((area) => {
                                if (
                                    Object.keys(restrictedArea).length === 0 ||
                                    area.id == restrictedArea.id
                                ) {
                                    if (
                                        location[0] >= area.minlat &&
                                        location[0] < area.maxlat &&
                                        location[1] >= area.minlng &&
                                        location[1] < area.maxlng
                                    ) {
                                        // If the vehicle is in a restricted area and we didn't detected that before push to restrictedArea object
                                        if (
                                            Object.keys(restrictedArea)
                                                .length === 0
                                        ) {
                                            restrictedArea = {
                                                id: area.id,
                                                title: area.title,
                                                entry: obj.time,
                                            };
                                        }
                                    } else {
                                        // If the vehicle is no longer in the restricted area, and has been in the restricted area so far, record the exit time
                                        if (
                                            Object.keys(restrictedArea).length >
                                            0
                                        ) {
                                            restrictedArea = {
                                                ...restrictedArea,
                                                exit: obj.time,
                                            };
                                            // Push violation to status object
                                            obj.violations.push({
                                                area: restrictedArea,
                                            });
                                            // Reset restrictedArea object
                                            restrictedArea = {};
                                        }
                                    }
                                }
                            });
                            if (!this.broadcasting) return cb();

                            // setTimeout in this case is there to emulate real life situation
                            // data that came out of the vehicle came in with irregular interval
                            // Hence the Math.random() on the second parameter
                            setTimeout(() => {
                                this.emit("data", obj);
                                cb();
                            }, Math.ceil(Math.random() * 150));
                        },
                    })
                )
                .once("finish", () => {
                    console.log("Finished broadcasting");
                    if (this.broadcasting) {
                        console.log("Re-broadcast");
                        broadcast();
                    } else {
                        console.log("Stopped broadcast");
                        return;
                    }
                });
        };
        broadcast();
    }

    end() {
        this.broadcasting = false;
    }
}

module.exports = Broadcaster;
