import React from 'react'
import { useAuth } from '../hooks/useAuth';

export const AddAddress = () => {

    const { session } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(ENDPOINT.createAddress, formData);
    
          navigate("/perfil/addresses");
    
        } catch (error) {
          const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
          setError(errorMessage);
        }
      };

    return (
        <>
            <AddressForm
                handleSubmit={handleSubmit}
            />
        </>
    )
}
