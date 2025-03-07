import { useEffect } from 'react';
import { useEncrypt } from './useEncrypt';

export const useStorage = () => {
	const { encrypted, decrypted, handleEncrypt, handleDecrypt } = useEncrypt();

	const handleSetStorageSession = (session) => {
		handleEncrypt(session);
	};

	const handleGetStorageSession = () => {
		const encryptedSession = localStorage.getItem('USER_SESSION');

		if (encryptedSession) {
			handleDecrypt(encryptedSession);
		}
	};

	const handleRemoveStorageSession = () => {
		localStorage.removeItem('USER_SESSION');
	};

	useEffect(() => {
		if (encrypted) {
			localStorage.setItem('USER_SESSION', encrypted);
		}
	}, [encrypted]);

	return {
		handleSetStorageSession,
		handleGetStorageSession,
		handleRemoveStorageSession,
		decrypted
	};
};
