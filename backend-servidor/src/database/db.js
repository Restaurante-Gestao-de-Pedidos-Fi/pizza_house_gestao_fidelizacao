import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";
import {copiarArquivos , apagarArquivos} from "./populate/populateFiles.js"

// Compatibilidade __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const createTablesSql = `
  CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL,
      telefone TEXT NOT NULL,
      cpf TEXT NOT NULL UNIQUE,
      pontosFidelidade INTEGER DEFAULT 0
  ) STRICT;

    CREATE TABLE IF NOT EXISTS cardapio (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    preco REAL NOT NULL,
    imagem TEXT,
    FOREIGN KEY (categoria) REFERENCES categorias(nome)
  ) STRICT;

  CREATE TABLE IF NOT EXISTS categorias (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      nome TEXT NOT NULL UNIQUE
  ) STRICT;
    
  CREATE TABLE IF NOT EXISTS itens_pedido (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER NOT NULL,
      item_id INTEGER NOT NULL,
      quantidade INTEGER NOT NULL,
      preco REAL NOT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
      FOREIGN KEY (item_id) REFERENCES cardapio(id)
  ) STRICT;

  CREATE TABLE IF NOT EXISTS pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      mesa_id INTEGER NOT NULL,
      total REAL NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (mesa_id) REFERENCES mesas(id)
  ) STRICT;

  CREATE TABLE IF NOT EXISTS mesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      numero INTEGER NOT NULL,
      capacidade INTEGER NOT NULL,
      estado TEXT NOT NULL
  ) STRICT;

  CREATE TABLE IF NOT EXISTS historico (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pedido_id INTEGER NOT NULL,
      status TEXT NOT NULL,
      data TEXT NOT NULL,
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id)
  ) STRICT;

  CREATE TABLE IF NOT EXISTS fidelidade (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER NOT NULL,
      pontos INTEGER NOT NULL,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id)
  ) STRICT;
`

const dropTablesSql = ` 
  DROP TABLE IF EXISTS cardapio;
  DROP TABLE IF EXISTS categorias;
`


export async function openDb() {
  return open({
    filename: path.join(__dirname, "database.sqlite"),
    driver: sqlite3.Database,
  });
}

// Cria a tabela (executar 1x no início)
export async function initDb() {
  const db = await openDb();
  await db.exec(createTablesSql);
}

export async function populateDb() {
  apagarArquivos('./src/uploads')
  copiarArquivos('./src/database/populate/img', './src/uploads')
  const db = await openDb();
  await db.exec(dropTablesSql)
  await db.exec(createTablesSql)
  await db.exec(`
    INSERT INTO categorias (nome)
    VALUES 
      ('bebida'),
      ('pizza')
    ON CONFLICT(nome) DO NOTHING;
    
    INSERT INTO cardapio (nome, descricao, preco, categoria, imagem)
    VALUES
    ('Coca Cola Zero', 'Refrigerante sem açúcar', 10, 'bebida', 'Coca-Cola-Zero.jpg'),
    ('Suco de Laranja Natural', 'Suco natural de laranja, sem conservantes', 8, 'bebida','Suco-de-Laranja-Natural.jpg'),
    ('Água com Gás', 'Água mineral gaseificada', 5, 'bebida', 'Água-com-Gás.jpeg'),
    ('Pizza Margherita', 'Molho de tomate, mussarela e manjericão', 35, 'pizza', 'Pizza-Margherita.jpeg'),
    ('Pizza Calabresa', 'Calabresa fatiada, cebola e mussarela', 38, 'pizza', 'Pizza-Calabresa.jpg'),
    ('Pizza Quatro Queijos', 'Mussarela, gorgonzola, parmesão e catupiry', 42, 'pizza', 'Pizza-Quatro-Queijos.jpg'),
    ('Pizza Portuguesa', 'Presunto, ovo, cebola, azeitona, pimentão e mussarela', 40, 'pizza', 'Pizza-Portuguesa.jpg'),
    ('Pizza Frango com Catupiry', 'Frango desfiado com catupiry e mussarela', 41, 'pizza','Pizza-Frango-com-Catupiry.jpg'),
    ('Guaraná Antarctica', 'Refrigerante sabor guaraná', 9, 'bebida', 'Guaraná-Antarctica.jpeg'),
    ('Cerveja Heineken Long Neck', 'Cerveja puro malte 330ml', 12, 'bebida', 'Cerveja-Heineken-Long-Neck.jpeg'),
    ('Pizza Pepperoni', 'Molho de tomate, mussarela e fatias de pepperoni', 43, 'pizza', 'Pizza-Pepperoni.jpg'),
    ('Pizza Vegetariana', 'Pimentão, cebola, azeitona, milho e mussarela', 37, 'pizza', 'Pizza-Vegetariana.jpeg'),
    ('Pizza de Bacon', 'Bacon crocante com mussarela e orégano', 44, 'pizza', 'Pizza-de-Bacon.jpg'),
    ('Pizza de Chocolate', 'Coberta com creme de chocolate e confeitos', 36, 'pizza', 'Pizza-de-Chocolate.jpg'),
    ('Pizza Romeu e Julieta', 'Mussarela com goiabada derretida', 35, 'pizza', 'Pizza-Romeu-e-Julieta.jpg'),
    ('Suco de Uva Integral', 'Suco 100% uva, sem açúcar e conservantes', 9, 'bebida', 'Suco-de-Uva-Integral.jpeg'),
    ('Refrigerante Pepsi', 'Refrigerante tradicional sabor cola', 9, 'bebida', 'Refrigerante-Pepsi.jpg'),
    ('Água sem Gás', 'Água mineral natural sem gás', 4, 'bebida', 'Água-sem-Gás.jpg'),
    ('Chá Gelado de Pêssego', 'Chá gelado sabor pêssego, levemente adoçado', 7, 'bebida', 'Chá-Gelado-de-Pêssego.jpeg'),
    ('Energético Red Bull', 'Bebida energética, lata 250ml', 14, 'bebida', 'Energético-Red-Bull.jpg');
    `);

}