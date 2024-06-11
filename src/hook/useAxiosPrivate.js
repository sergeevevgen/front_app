import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "./useAuth";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { user, signIn } = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                console.log('error: ' + error);

                if ((error?.response?.status === 401 && !prevRequest?.sent)) {
                    console.log(error.response);
                    console.log('here i am...')
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();

                    user.accessToken = newAccessToken;
                    console.log(user);
                    signIn(user, () => {});

                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [user, refresh, signIn])

    return axiosPrivate;
}

export default useAxiosPrivate;