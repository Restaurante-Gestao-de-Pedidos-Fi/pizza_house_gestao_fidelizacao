import { Router } from "express";
import Cardapio from "../controllers/cardapioController.js";
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

   // Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
        cb(null, './src/uploads/'); 
  },
  filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

/* const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsPath = path.join(__dirname, '../uploads'); */

const upload = multer({ storage: storage });

const cardapio = new Cardapio();
const router   = Router();

router.post("/",upload.single('imagem'), cardapio.criarItem);
router.get("/", cardapio.listarItens);
router.get("/:id", cardapio.buscarItemPorId);
router.put("/:id", upload.single('imagem'),cardapio.atualizarItem);
router.delete("/:id", cardapio.removerItem);
router.get("/categoria/:categoria", cardapio.buscarItensPorCategoria);
router.get("/nome/:nome", cardapio.buscarItensPorNome);
router.get("/imagem/:imagem", cardapio.obterImagem);


export default  router; 
