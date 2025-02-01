import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

export const useAuth = () => {
	const { session, isLoading, handleSession } = useContext(AuthContext);

	return {
		session,
		isLoading,
		handleSession,
	};
};