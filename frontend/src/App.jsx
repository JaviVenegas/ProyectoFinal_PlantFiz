import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import { RouterManager } from "./router/RouterManager";

// Aqui se declaran los import como el del carrito de compras

function App() {
  return (
    <>
      <AuthProvider>
        <RouterManager />
      </AuthProvider>
    </>
  );
}

export default App;
