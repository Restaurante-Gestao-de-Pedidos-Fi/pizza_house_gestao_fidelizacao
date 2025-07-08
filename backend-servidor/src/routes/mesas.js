import { Router } from "express";
import Mesas from "../controllers/mesasController.js";

const mesas = new Mesas();
const router = Router();    

router.post("/", mesas.criarMesa);
router.get("/", mesas.listarMesas);  
router.get("/:id", mesas.buscarMesaPorId);
router.put("/:id", mesas.atualizarMesa);
router.delete("/:id", mesas.removerMesa);
router.get("/estado/:estado", mesas.buscarMesasPorEstado);

export default router;