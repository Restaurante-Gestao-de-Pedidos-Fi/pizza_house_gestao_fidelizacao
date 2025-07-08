import { Router } from "express";
import {
  criarCliente,
  listarClientes,
  atualizarCliente,
  removerCliente,
  buscarCliente
} from "../controllers/clientesController.js";

const clienteRouter = Router();

clienteRouter.post("/", criarCliente);
clienteRouter.get("/", listarClientes);
clienteRouter.get("/:id", buscarCliente);
clienteRouter.put("/:id", atualizarCliente);
clienteRouter.delete("/:id", removerCliente);

export default  clienteRouter; 
