import { createContext, useState, useMemo, useEffect } from "react";

// Crear contexto
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addCart = (nuevaPlanta) => {
    setCart((prevCarro) => {
      const existe = prevCarro.find((planta) => planta.id === nuevaPlanta.id);
      if (existe) {
        return prevCarro.map((planta) =>
          planta.id === nuevaPlanta.id
            ? { ...planta, count: planta.count + nuevaPlanta.count }
            : planta
        );
      } else {
        return [...prevCarro, { ...nuevaPlanta, count: 1 }];
      }
    });
  };

  const removeFromCart = (plantaId) => {
    setCart((prevCarro) => {
      return prevCarro
        .map((planta) =>
          planta.id === plantaId
            ? { ...planta, count: planta.count > 1 ? planta.count - 1 : 0 }
            : planta
        )
        .filter((planta) => planta.count > 0);
    });
  };

  const deletePlanta = (plantaId) => {
    setCart((prevCarro) => prevCarro.filter((planta) => planta.id !== plantaId));
  };

  const total = useMemo(() => {
    return cart.reduce((pt, item) => pt + item.precio * item.count, 0);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addCart, removeFromCart, deletePlanta, total }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
