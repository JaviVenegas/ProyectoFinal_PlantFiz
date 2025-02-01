import { createContext, useState, useMemo } from "react";


//Create context
export const CartContext = createContext();

export const CartProvider = ({children}) => {
    

    const [cart, setCart] = useState([]);


//Codigo para agregar productos al carrito 
    const addCart = (nuevaPlanta) => {
        setCart(prevCarro => {
            const existe = prevCarro.find(planta=> planta.id === nuevaPlanta.id);
            if (existe) {
                return prevCarro.map(planta =>
                    planta.id === nuevaPlanta.id
                        ? { ...planta, count: planta.count + nuevaPlanta.count }
                        : planta
                );
            } else {
                return [...prevCarro, nuevaPlanta];
            }
        });
    };

// Ccodigo para quitar producto al carrito
const removeFromCart = (plantaId) => {
    setCart(prevCarro => {
        return prevCarro
            .map(planta =>
                planta.id === plantaId
                    ? { ...planta, count: planta.count > 1 ? planta.count - 1 : 0 } 
                    : planta
            )
            .filter(planta => planta.count > 0); 
    });
};


//Codigo para borrar productos del carrito

const deletePlanta = (plantaId) => {
    setCart(prevCarro => prevCarro.filter(planta => planta.id !== plantaId));
};

// codigo para sumar el total
    const total = useMemo(() => {
        return cart.reduce((pt, item) => pt + item.precio * item.count, 0);
    }, [cart])

// Code to use sons generated. 
    return (
        <CartContext.Provider value = {{cart, addCart, removeFromCart, deletePlanta, total }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider