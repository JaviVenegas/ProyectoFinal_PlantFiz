import { createContext, useEffect, useState } from 'react';
import { useStorage } from '../hooks/useStorage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const { handleSetStorageSession, handleGetStorageSession, decrypted } =
		useStorage();

	const [session, setSession] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleSession = (session) => {
		setSession(session);
		handleSetStorageSession(session);
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
		<AuthContext.Provider value={{ session, isLoading, handleSession }}>
			{children}
		</AuthContext.Provider>
	);
};