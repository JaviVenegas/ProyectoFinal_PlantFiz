import { ENDPOINT } from "../config/constants";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { AddressForm } from "../components/AddressForm";
import { useState } from "react";

export const AddressFormPage = ({ setEditAddress, address }) => {

    const { session } = useAuth();
    const [formData, setFormData] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${ENDPOINT.updateAddress}/${address.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${session?.token}`,
                    "Content-Type": "application/json",
                },
            });

            setEditAddress(false);

        } catch (error) {
            console.error("Error al actualizar la dirección:", error);
        }
    };

    return (
        <>
            <AddressForm
                handleSubmit={handleSubmit} address={address} setFormData={setFormData}
            />
        </>
    )
}
