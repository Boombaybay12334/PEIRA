module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm preview --host 127.0.0.1 --port 4322",
      startServerReadyPattern: "Local",
      startServerReadyTimeout: 120000,
      url: [
        "http://127.0.0.1:4322/",
        "http://127.0.0.1:4322/archive/",
        "http://127.0.0.1:4322/about/",
        "http://127.0.0.1:4322/topics/wars/",
      ],
      numberOfRuns: 1,
      settings: { chromeFlags: "--headless --no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:performance": ["error", { minScore: 0.9 }],
      },
    },
    upload: { target: "temporary-public-storage" },
  },
};
