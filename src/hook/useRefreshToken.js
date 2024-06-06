import axios from '../api/axios';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';

const useRefreshToken = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const refresh = async () => {
        try {
            console.log("refreshing...");

            const response = await axios.post('User/refreshToken', {
                tokenHash: user.refreshToken
            });
            
            return response.data.accessToken;
        // Если ошибка, то, значит, что наш рефреш-токен закончился
        } catch (error) {
            console.error('Произошла ошибка:', error);
            signOut(() => navigate('/', {replace: true}));
        }
    }

    return refresh;
};

export default useRefreshToken;
