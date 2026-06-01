import { Router } from "express";
import { vendedorController } from "../controllers/vendedorController";

const router = Router();
const controller = new vendedorController();

router.get("/notas/:id", (req, res) => controller.listarNotasDoVendedor(req, res));
router.get("/", (req, res) => controller.listarVendedores(req, res));
router.get("/:id", (req, res) => controller.buscarVendedor(req, res));
router.post("/", (req, res) => controller.criarVendedor(req, res));
router.put("/:id", (req, res) => controller.atualizarVendedor(req, res));
router.delete("/:id", (req, res) => controller.deletarVendedor(req, res));
 
export default router;
