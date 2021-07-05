# ViriCiti Dashboard

A [Vue.js](https://www.npmjs.com/package/vue) based dashboard for ViriCiti Vue assignment. The dashboard connects to the WebSocket server and shows the current location of a vehicle on the map, and displays real-time information such as state of charge, speed, energy, and odometer in the form of various charts and cards.

<p align="center">
  <a href="https://viriciti.netlify.app" target="_blank">
    <img src="https://user-images.githubusercontent.com/63710663/124396855-613d5200-dd21-11eb-8615-f838176cc9d3.png" width="700px">
    <br>
    Live Demo
  </a>
</p>

## 💡 Features

- General
  - Reusable Components
  - Clean & Commented Code
  - Fully Responsive Layout
  - Unit Tests
  - Organized Folder Structure
  - Real-time Data Updates with Websocket
- Dashboard
  - Vehicle Real-time Location on Leaflet Map (Marker Color Changes According to the Vehicle's State of Charge)
  - Speed Gauge Chart (Chart Color Changes based on whether the Car Speed is Allowed or not)
  - SoC Gauge Chart (Chart Color Changes According to the Vehicle's State of Charge)
  - Energy Level Card
  - Odometer Info Card
  - Speed Line Chart (Chart Color Changes based on whether the Car Speed is Allowed or not)
  - SoC Line Chart (Line Color Changes According to the Vehicle's State of Charge)
  - Last Three Speed Violations (Based on the Speed Limit Defined in each Bound)
  - Last Three Entry into Restricted Areas (Based on the Defined Restricted Areas)

## 🚀 Getting Started

```bash
# install dependencies
npm install # or yarn

# copy environment file
cp .env.production .env.development.local

# set environment variables
ENV='development'
VUE_APP_WEBSOCKET_URL='ws://localhost:3000' # set your local websocket url

# serve in dev mode, with hot reload at localhost:8080
npm run serve
```

## 💻 Build

```bash
# build for production environment
npm run build
```

## 🧐 Advanced

```bash
# run unit tests
npm run test:unit

# code format check
npm run lint
```
