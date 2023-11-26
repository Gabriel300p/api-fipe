import express, { Request, Response } from "express";
import { db } from "../lib/db";

const router = express.Router();

router.get<{}, any>("/", async (req, res) => {
  try {
    const questionario = await db.questionario.findMany({
      select: {
        latitude: true,
        longitude: true,
        dataHora: true,
        user: {
          select: {
            name: true,
          },
        },
        ItemQuestionario: {
          select: {
            resposta: true,
            observacao: true,
            imagem: true,
            pergunta: {
              select: {
                concessionaria: true,
                tipodeObra: true,
                local: true,
                elementoFisico: true,
                pergunta: true,
                unidadeMedida: true,
              },
            },
          },
        },
      },
    });

    res.json(questionario);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post<{}, any>(
  "/",
  async (req: Request<any, any, any>, res: Response) => {
    try {
      const requestData = req.body;

      const questionario = await db.questionario.create({
        data: {
          latitude: requestData.latitude,
          longitude: requestData.longitude,
          userId: requestData.userId,
          ItemQuestionario: {
            createMany: {
              data: requestData.ItemQuestionario.map((item: any) => ({
                perguntaId: item.perguntaId,
                imagem: item.imagem,
                resposta: item.resposta,
                observacao: item.observacao,
              })),
            },
          },
        },
      });

      res.json(questionario);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Bad Request" });
    }
  }
);

export default router;
