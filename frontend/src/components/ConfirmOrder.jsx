import { useState, useContext } from 'react';
import { CartContext } from "../context/CartContext";
import "./ConfirmOrder.css";

export const ConfirmOrder = () => {
  const { cart, total } = useContext(CartContext);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      direccion: 'Av. Siempre Viva 799',
      ciudad: 'Japon',
      region: 'Boston',
      codigoPostal: '65000'
    },
    {
      id: 2,
      direccion: 'Hola2',
      ciudad: 'SAN CRISTOBAL',
      region: 'Nula',
      codigoPostal: '62799'
    }
  ]);

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      name: 'Transferencia Bancaria',
      description: 'Pago directo desde tu banco'
    },
    {
      id: 2,
      name: 'Tarjeta de Crédito',
      description: 'Pago con tarjeta de crédito'
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handleSelectAddress = (addressId) => {
    setSelectedAddress(addressId);
  };

  const handleSelectPaymentMethod = (paymentMethodId) => {
    setSelectedPaymentMethod(paymentMethodId);
  };

  return (
    <div className="container my-5 d-flex flex-column py-4">
      <h2 className="text-center mb-4">Confirmación de Pedido</h2>

      {/* Sección de Direcciones */}
      <div className="p-4 mb-2 border rounded">
        <h4>1) Elige la dirección de entrega</h4>
        <div className="flex-wrap p-2 mt-3">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="d-flex flex-column align-items-center my-2"
            >
              <div
                className={`card ${selectedAddress === address.id ? 'border-custom' : ''}`}
                style={{
                  cursor: 'pointer',
                  minHeight: '120px',
                  borderRadius: '10px',
                  minWidth: '70vw',
                  backgroundColor: '#f8f9fa'
                }}
                onClick={() => handleSelectAddress(address.id)}
              >
                <div className="p-3">
                  <div>
                    <p className="card-text mb-1"><strong>Dirección:</strong> {address.direccion}</p>
                    <p className="card-text mb-1"><strong>Ciudad:</strong> {address.ciudad}</p>
                    <p className="card-text mb-1"><strong>Región:</strong> {address.region}</p>
                    <p className="card-text"><strong>Código Postal:</strong> {address.codigoPostal}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Formas de Pago */}
      <div className="p-4 mt-4 mb-2 border rounded">
        <h4>2) Elige la forma de pago</h4>
        <div className="flex-wrap p-2 mt-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="d-flex flex-column align-items-center my-2"
            >
              <div
                className={`card ${selectedPaymentMethod === method.id ? 'border-custom' : ''}`}
                style={{
                  cursor: 'pointer',
                  minHeight: '120px',
                  borderRadius: '10px',
                  minWidth: '70vw',
                  backgroundColor: '#f8f9fa'
                }}
                onClick={() => handleSelectPaymentMethod(method.id)}
              >
                <div className="p-3">
                  <div>
                    <p className="card-text mb-1"><strong>{method.name}</strong></p>
                    <p className="card-text">{method.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verificar el pedido */}
      <div className="p-4 mt-4 mb-2 border rounded">
        <h4>3) Verifica tu pedido</h4>
        <div className="d-flex flex-wrap justify-content-center p-2 mt-3">
          <div className="card" style={{
            borderRadius: '10px',
            minWidth: '70vw',
            backgroundColor: '#f8f9fa'
          }}>
            <div className="card-body p-1">
              {cart.map((item) => (
                <div className="container">
                  <div key={item.id} className="d-flex justify-content-between border-bottom">
                    <div className="d-flex align-items-center gap-4">
                      <div style={{ width: "60px", height: "60px", overflow: "hidden", borderRadius: "50%" }}>
                        <img
                          src={item.imagen_url}
                          alt={item.nombre_planta}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      </div>
                      <div className="d-flex flex-column justify-content-center mt-3">
                        <p><strong>{item.nombre_planta}</strong></p>
                        <p className="text-muted">Cantidad: {item.cantidad}</p>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Precio: ${item.precio.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="container my-3 p-2">
                <div className="d-flex justify-content-between">
                  <strong>Total:</strong>
                  <strong>${total.toLocaleString()}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-5"
        style={{ minWidth: "70vw", width: "100%" }}>
        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: "#a6bd75", minWidth: "12rem" }}
          onClick={() => {
            // Add functionality to cancel purchase
          }}
        >
          Volver Atrás
        </button>

        <button
          className="btn btn-primary mt-3"
          style={{ backgroundColor: "#a6bd75", minWidth: "12rem" }}
          onClick={() => {
            // Add functionality to confirm purchase
          }}
        >
          Confirmar Compra
        </button>
      </div>
    </div>
  );
}