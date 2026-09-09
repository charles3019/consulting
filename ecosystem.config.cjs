module.exports = {
  apps: [
    {
      name: "connectforge",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start --hostname 127.0.0.1 --port 3000",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "750M",
      kill_timeout: 10000,
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
