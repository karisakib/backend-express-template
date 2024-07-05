const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  outputDir: "./reports",
  reporter: [
    ["list"],
    ["json", { outputFile: "report.json" }],
    ["html", { outputFolder: 'reports', outputFile: "report.html" }],
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
