require("dotenv").config();

const express = require("express");
const cors = require("cors");
const listener = require("./listener");
const db = require("./db");

const app = express();

const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(express.json());
app.use(cors({ origin: CORS_ORIGIN }));

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/track-wallet", require("./routes/trackWallet"));
app.use("/api/stats", require("./routes/stats"));
app.use("/api/referral-tree", require("./routes/referralTree"));

db.init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Urano referral API listening on port ${PORT}`);
      try {
        listener.start();
      } catch (err) {
        console.error("Failed to start swap listener:", err.message);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err.message);
    process.exit(1);
  });

module.exports = app;
