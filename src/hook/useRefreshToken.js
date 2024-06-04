import axios from '../api/axios';
import { useAuth } from './useAuth';

const useRefreshToken = () => {
    const { setUser } = useAuth();

    const refresh = async () => {
        console.log("refreshing...");
        const response = await axios.get('User/refreshToken', {
            withCredentials: true
        });
        setUser(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;
