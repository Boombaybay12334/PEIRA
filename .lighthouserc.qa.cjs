module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm preview:qa --host 127.0.0.1 --port 4323",
      startServerReadyPattern: "Local",
      startServerReadyTimeout: 120000,
      url: [
        "http://127.0.0.1:4323/",
        "http://127.0.0.1:4323/archive/",
        "http://127.0.0.1:4323/about/",
        "http://127.0.0.1:4323/topics/wars/",
        "http://127.0.0.1:4323/essays/leipzig-1813/",
      ],
      numberOfRuns: 1,
      settings: { chromeFlags: "--headless --no-sandbox", emulatedFormFactor: "mobile" },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:performance": ["warn", { minScore: 0.9 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
