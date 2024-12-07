import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from "./components/Navbar";
import Sidebar from './components/Sidebar';
import { AuthProvider } from "./context/authContext";
import { ProtectedRoute } from "./routes";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import Dashboard from './pages/Dashboard';

import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import UpdateProduct from "./pages/UpdateProduct";

import Clients from "./pages/Clients";
import CreateClient from "./pages/CreateClient";
import UpdateClient from "./pages/UpdateClient";

import Providers from "./pages/Providers";
import CreateProvider from "./pages/CreateProvider";
import UpdateProvider from "./pages/UpdateProvider";

import Tasks from "./pages/Tasks";
import CreateTask from "./pages/CreateTask";
import UpdateTask from "./pages/UpdateTask";

import Orders from "./pages/Orders";
import CreateOrder from "./pages/CreateOrder";
import UpdateOrder from "./pages/UpdateOrder";

function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
          <Content />
        </BrowserRouter>
    </AuthProvider>
  );
}

function Content() {
  const location = useLocation();

  // Ocultar Sidebar en las rutas específicas
  const hideSidebar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar: se posiciona de forma fija, sin sobreponerse al contenido */}
      <div className={`sidebar ${!hideSidebar ? 'd-block' : 'd-none'}`}>
        <Sidebar />
      </div>

      {/* Contenedor principal con margen a la izquierda cuando el Sidebar está visible */}
      <main className={`container-fluid px-10 md:px-0 ${!hideSidebar ? 'ml-250' : 'ml-0'}`} style={{ minHeight: '100vh', backgroundColor: 'white' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/create" element={<CreateProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/create-client" element={<CreateClient />} />
            <Route path="/update-client/:id" element={<UpdateClient />} />
            <Route path="/providers" element={<Providers />} />
            <Route path="/create-provider" element={<CreateProvider />} />
            <Route path="/update-provider/:id" element={<UpdateProvider />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/update-task/:id" element={<UpdateTask />} />
            <Route path="/orders" element={<Orders/>} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/update-order/:id" element={<UpdateOrder />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;
