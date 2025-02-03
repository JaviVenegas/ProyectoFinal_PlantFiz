import { createContext, useEffect, useState } from 'react';
import { useStorage } from '../hooks/useStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { handleSetStorageSession, handleGetStorageSession, handleRemoveStorageSession, decrypted } =
		useStorage();

	const [session, setSession] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleSession = (session) => {
		setSession(session);
		handleSetStorageSession(session);
	};

	const handleLogout = () => {
		setSession(null);
		handleRemoveStorageSession(); //Que pasa si aquí añado la sesión? Cual es la diferencia
	};

	useEffect(() => {
		handleGetStorageSession();
	}, [handleGetStorageSession]);

	useEffect(() => {
		if (decrypted) {
			setSession(JSON.parse(decrypted));
		}

		setTimeout(() => {
			setIsLoading(false);
		}, 1);
	}, [decrypted]);

	return (
		<AuthContext.Provider value={{ session, isLoading, handleSession, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};