import express from "express";
import { db } from "../lib/db";

const router = express.Router();

router.post<{}, any>("/", async (req, res) => {
  const { email } = req.body;

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  res.json(user);
});

export default router;
