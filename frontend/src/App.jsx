import "./App.css";
import { AuthProvider } from "./context/AuthProvider";
import CartProvider from "./context/CartContext";
import { RouterManager } from "./router/RouterManager";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <RouterManager />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
