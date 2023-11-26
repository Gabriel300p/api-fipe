import express from "express";

import MessageResponse from "../interfaces/MessageResponse";
import emojis from "./emojis";
import questionario from "./questionario";
import user from "./user";
import username from "./username";

const router = express.Router();

router.get<{}, MessageResponse>("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/emojis", emojis);
router.use("/questionario", questionario);
router.use("/username", username);
router.use("/user", user);

export default router;
