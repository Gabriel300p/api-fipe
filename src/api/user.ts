import express from "express";
import { z } from "zod";
import { db } from "../lib/db";

const router = express.Router();

router.get<{}, any>("/", async (req, res) => {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string(),
  });

  const { name, email } = bodySchema.parse(req.body);

  const user = await db.user.create({
    data: {
      name,
      email,
    },
  });

  res.json(user);
});

export default router;
