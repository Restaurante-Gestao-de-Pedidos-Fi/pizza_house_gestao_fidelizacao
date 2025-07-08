import backgroundImage2 from "../assets/image/pizzaFundo.webp";

const Home = () => {
  return (
    <div
      className="font-sans"
      style={{
        background: "linear-gradient(#000000, #fff)",
      }}
    >
      <section
        className="d-flex align-items-center justify-content-center text-white text-center position-relative opacity-75"
        style={{
          backgroundImage: `url(${backgroundImage2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "500px",
        }}
      >
        <div className="" style={{ fontFamily: "ChunkFive Print" }}>
          <div className="">
            <h1
              className="display-3  mb-3"
              style={{
                fontSize: "5rem",
                textShadow: "1px 1px 10px black",
              }}
            >
              Bem-vindo à Pizza Delícia
            </h1>
            <p
              className="lead fs-2"
              style={{
                textShadow: "1px 1px 12px black",
              }}
            >
              A melhor pizza da cidade, direto do forno para você!
            </p>
          </div>
        </div>
      </section>

      <section className="py-5 text-center bg-light">
        <h2 className="text-danger mb-5">Nossas Pizzas Favoritas</h2>
        <div className="container">
          <div className="row">
            {[
              {
                name: "Margherita",
                desc: "Molho de tomate, mussarela, manjericão fresco.",
              },
              {
                name: "Calabresa",
                desc: "Calabresa fatiada, cebola roxa e azeitonas pretas.",
              },
              {
                name: "Quatro Queijos",
                desc: "Mussarela, gorgonzola, parmesão e catupiry.",
              },
            ].map((pizza, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title text-danger">{pizza.name}</h5>
                    <p className="card-text">{pizza.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white text-left">
        <div className="container">
          <h2 className="text-danger mb-4">Sobre o Projeto</h2>
          <p className="lead">
            O{" "}
            <strong>
              Projeto Restaurante (Gestão de Pedidos e Fidelização)
            </strong>{" "}
            foi desenvolvido como parte da jornada de aprendizado na área de
            Desenvolvimento Fullstack. Utilizamos o framework{" "}
            <strong>React</strong> com <strong>Vite</strong> para criar um
            frontend moderno, dinâmico e rápido, estilizado com{" "}
            <strong>Bootstrap</strong> para garantir uma interface amigável e
            responsiva.
          </p>
          <p className="lead">
            No backend, a aplicação é construída com <strong>Node.js</strong> e{" "}
            <strong>Express</strong>, permitindo uma arquitetura robusta para
            lidar com as requisições da aplicação. Como banco de dados, optamos
            por <strong>SQLite</strong>, uma solução leve, prática e eficiente
            para esse tipo de projeto.
          </p>
          <p className="lead">
            Atualmente, a parte interativa da aplicação está concentrada na
            funcionalidade de <strong>Cardápio</strong>, que possui um CRUD
            completo — com criação, listagem, edição e exclusão de itens. As
            demais telas, como "Home" e outras páginas institucionais, ainda
            estão em formato estático.
          </p>
          <p className="lead">
            Esse projeto representa mais do que uma entrega técnica — ele é uma
            amostra prática do processo de construção de aplicações web
            modernas, desde a estruturação até a implementação das interações
            com o usuário.
          </p>
        </div>
      </section>

      <footer className="bg-dark text-white text-center py-4">
        <p className="mb-0">
          &copy; 2025 Toti Fullstack <strong>Grupo 4</strong>. Todos os direitos
          reservados.
        </p>
      </footer>
    </div>
  );
};

export default Home;
