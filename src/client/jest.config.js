module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
  moduleFileExtensions: ["js", "vue", "json"],
  verbose: true,
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  transformIgnorePatterns: ["/node_modules/(?!leaflet)"],
  testPathIgnorePatterns: ["/dist/", "/node_modules/"],
};
