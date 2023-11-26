import express from "express";
import { z } from "zod";
import { db } from "../lib/db";

const router = express.Router();

router.get<{}, any>("/", async (req, res) => {
  const bodySchema = z.object({
    email: z.string(),
  });
  const { email } = bodySchema.parse(req.body);

  const user = await db.user.findFirst({
    where: {
      email: email,
    },
  });
  res.json(user);
});

export default router;
