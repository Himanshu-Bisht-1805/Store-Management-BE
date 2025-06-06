import app from "./app.js";
import { connectDB, closeDBConnection } from "./config/db.connection.js";
import { envVariables } from "./config/env.validate.js";

const PORT = envVariables.PORT || 5000;

let server;

connectDB().then(() => {
  server = app.listen(PORT, () => {
    console.table([
      {
        Port: PORT,
        "Database Host": new URL(envVariables.MONGO_URI).host,
        "MongoDB Status": "Connected",
      },
    ]);
  });
});

const gracefulShutdown = async () => {
  console.log("\n🛑 Shutting down server...");

  if (server) {
    // Wrap server.close in a promise to await it
    await new Promise((resolve) => {
      server.close(() => {
        console.log("HTTP server closed");
        resolve();
      });
    });
  }

  await closeDBConnection();

  console.log("Shutdown complete. Exiting process.");
  process.exit(0);
};

process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
