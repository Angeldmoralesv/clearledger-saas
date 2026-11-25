module.exports = {
  apps: [
    {
      name: "clearledger-saas",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
