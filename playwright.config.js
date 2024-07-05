const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./__tests__",
  outputDir: "./__reports__",
  reporter: [
    ["list"],
    ["json", { outputFolder: '__reports__', outputFile: "report.json" }],
    ["html", { outputFolder: '__reports__', outputFile: "report.html" }],
  ],
  fullyParallel: true,
  projects: [
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL: "http://localhost:3000",
        extraHTTPHeaders: {
          "Content-Type": "application/json",
        },
      },
    },
    {
      name: "views",
      testDir: "./tests/views",
      use: {
        baseURL: "http://localhost:3000",
        browserName: "chromium",
        ...devices["Desktop Chrome"],
      },
    },
  ],
});
