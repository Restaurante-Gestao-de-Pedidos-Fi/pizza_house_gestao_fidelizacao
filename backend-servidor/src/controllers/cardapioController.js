import { openDb } from "../database/db.js";

class Cardapio{

   async criarItem(req, res) {
    try {
      const { nome, descricao, preco, categoria} = req.body;
      const imagem = req.file ? req.file.filename : null;
      //console.log(req.file)

      if (!nome || !descricao || !preco || !categoria) {

        return res.status(400).json({ error: "Todos os campos são obrigatórios." });

      } 

      const db  = await openDb();
      const sql = "INSERT INTO cardapio (nome, descricao, preco, categoria, imagem) VALUES (?, ?, ?, ?, ?)";
      await db.run(sql, [nome, descricao, preco, categoria, imagem]);

      res.status(201).json({ message: "Item criado com sucesso!" });
      console.log("Item criado:", { nome, descricao, preco, categoria, imagem }); 
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async listarItens(req, res) {
    try {
      const db    = await openDb();
      const sql   = "SELECT * FROM cardapio";
      const itens = await db.all(sql);

      res.json(itens);

      console.log("Itens listados:", itens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async atualizarItem(req, res) {
    try {
      const id  = req.params.id;
      const db  = await openDb();

      const result  = await db.get(`SELECT imagem FROM cardapio WHERE id =${id}`)
      console.log("imagem no banco:", result.imagem)

      const imagem = req.file ? req.file.filename : result.imagem
      //console.log("req.file: ", req.file)
      //console.log("req.file.name: ", req.file.name)
      console.log("atualizando: ", id)

      const { nome, descricao, preco, categoria } = req.body;

      const sql = "UPDATE cardapio SET nome = ?, descricao = ?, preco = ?, categoria = ? , imagem = ?  WHERE id = ?";

      await db.run(sql, [nome, descricao, preco, categoria, imagem, id]);
      
      res.json({ message: "Cardápio atualizado com sucesso!" });

      console.log("Item atualizado:", { id, nome, descricao, preco, categoria });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  async removerItem(req, res) {
    try {
      const id  = req.params.id;
      const db  = await openDb();
      const sql = "DELETE FROM cardapio WHERE id = ?";
      await db.run(sql, [id]);
      
      res.json({ message: "Item removido com sucesso!" });
      
      console.log("Item removido:", { id });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarItemPorId(req, res) {
    try {
      const id   = req.params.id;
      const db   = await openDb();
      const sql  = "SELECT * FROM cardapio WHERE id = ?";
      const item = await db.get(sql, [id]);

      if (!item) {
        return res.status(404).json({ message: "Cardápio não encontrado!" });
      }
        
      res.status(200).json(item);
      console.log("Item encontrado:", item);

      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarItensPorCategoria(req, res) {
    try {
      const categoria = req.params.categoria;
      const db        = await openDb();
      const sql       = "SELECT * FROM cardapio WHERE categoria = ?";
      const itens     = await db.all(sql, [categoria]);

      if (itens.length === 0) {
        return res.status(404).json({ message: "Nenhum item encontrado nessa categoria!" });
      }
      
      res.status(200).json(itens);

      console.log("Itens encontrados na categoria:", categoria, itens);

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async buscarItensPorNome(req, res) {
    try {
      const nome = req.params.nome;
      const db   = await openDb();
      const sql  = "SELECT * FROM cardapio WHERE nome LIKE ?";
      const itens = await db.all(sql, [`%${nome}%`]);
      
      if (itens.length === 0) {
        return res.status(404).json({ message: "Nenhum item encontrado com esse nome!" });
      }
      
      res.json(itens);
      
      console.log("Itens encontrados com o nome:", nome, itens);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obterImagem(req, res) {
    try {
      const imagem = req.params.imagem;
      if (!imagem) {
        return res.status(404).json({ message: "Imagem não encontrada!" });
      }

      res.status(200).sendFile(imagem, { root: './src/uploads' });

      console.log("Imagem obtida:", imagem);
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default Cardapio;