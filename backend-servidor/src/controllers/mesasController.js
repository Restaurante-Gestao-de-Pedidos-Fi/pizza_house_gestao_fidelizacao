import { openDb } from "../database/db.js";

class Mesas{

  async criarMesa(req, res) {
    try {
      const { numero, capacidade, estado } = req.body;
  
      if (!numero || !capacidade || !estado) {
        
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
      } 
      console.log("Dados recebidos:", { numero, capacidade, estado });
   
      const db  = await openDb();
      const sql = "INSERT INTO mesas (numero, capacidade, estado) VALUES (?, ?, ?)";
      await db.run(sql, [numero, capacidade, estado]);
  
      res.status(201).json({ message: "Mesa criada com sucesso!" });
      console.log("Mesa criada:", { numero, capacidade, estado });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
 }

 async  listarMesas(req, res) {
  try {
    const db    = await openDb();
    const sql   = "SELECT * FROM mesas";
    const mesas = await db.all(sql);

    res.json(mesas);

    console.log("Mesas listadas:", mesas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async atualizarMesa(req, res) {
  try {
    const { numero, capacidade, estado } = req.body;

    const id  = req.params.id;
    const db  = await openDb();
    const sql = "UPDATE mesas SET numero = ?, capacidade = ?, estado = ? WHERE id = ?";

    await db.run(sql, [numero, capacidade, estado, id]);
    
    res.json({ message: "Mesa atualizada com sucesso!" });

    console.log("Mesa atualizada:", { id, numero, capacidade, estado });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }


}

async buscarMesaPorId(req, res) {
  try {
    const id   = req.params.id;
    const db   = await openDb();
    const sql  = "SELECT * FROM mesas WHERE id = ?";
    const mesa = await db.get(sql, [id]);

    if (!mesa) {
      return res.status(404).json({ message: "Mesa não encontrada" });
    } 
    res.status(200).json(mesa);
    console.log("Mesa encontrada:", mesa);
  

  } catch (error) {
    res.status(500).json({ error: error.message });
  }





 
}
async buscarMesasPorEstado(req, res) {
  try {
    const estado = req.params.estado;
    const db     = await openDb();
    const sql    = "SELECT * FROM mesas WHERE estado = ?";
    const mesas  = await db.all(sql, [estado]);

    if (mesas.length === 0) {
      return res.status(404).json({ message: "Nenhuma mesa encontrada com esse estado." });
    }

    res.status(200).json(mesas);
    console.log("Mesas encontradas por estado:", mesas);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
async removerMesa(req, res) {
  try {
    const id  = req.params.id;
    const db  = await openDb();
    const sql = "DELETE FROM mesas WHERE id = ?";
    await db.run(sql, [id]);
    
    res.json({ message: "Mesa removida com sucesso!" });
    
    console.log("Mesa removida:", { id });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


}

export default Mesas;






  
  