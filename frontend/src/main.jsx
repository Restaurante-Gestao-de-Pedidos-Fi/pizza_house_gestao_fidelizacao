import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";

//Componentes
import App from "./App.jsx";
import NavbarComponent from "./components/Navbar.jsx";
import Cardapio from "./pages/Cardapio.jsx";
import Mesas from "./pages/Mesas.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Clientes from "./pages/Clientes.jsx";

//importando bootstrap e bootstrap-icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

//importando css
import "./index.css";

const routes = [
  { id: 1, name: "Home", path: "/", element: <App /> },
  { id: 2, name: "Cardápio", path: "/cardapio", element: <Cardapio /> },
  { id: 3, name: "Mesas", path: "/mesas", element: <Mesas /> },
  { id: 4, name: "Pedidos", path: "/pedidos", element: <Pedidos /> },
  { id: 5, name: "Clientes", path: "/clientes", element: <Clientes /> },
];

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <NavbarComponent routes={routes} />
    <Routes>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
      {/* <Route path="/" element={<App />} />*/}
    </Routes>
  </BrowserRouter>
);
