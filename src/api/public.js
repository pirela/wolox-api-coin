import express from "express";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";
import coinRoutes from "./routes/coin";

const publicRoutes = express.Router();

publicRoutes.use("/user", userRoutes);
publicRoutes.use("/auth", authRoutes);
publicRoutes.use("/coin", coinRoutes);

publicRoutes.get("/", (req, res) => {
  res.send("Wolox");
});

export default publicRoutes;
