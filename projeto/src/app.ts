import express, { Application, Request, Response } from "express";

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`API rodando na URL : http://localhost:${PORT}`));