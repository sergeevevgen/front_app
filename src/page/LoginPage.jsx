import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'
import axios from '../api/axios';

const LOGIN_URL = 'User/login';

const LoginPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {signIn} = useAuth();

    const fromPage = location.state?.from?.pathname || '/';

    const handleSubmit = async (event) => {
        event.preventDefault();

        const form = event.target;
        const login = form.login.value;
        const password = form.password.value;
        
        try {
          const response = await axios.post(LOGIN_URL,
            JSON.stringify({ login, password }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
          );
          
          console.log(JSON.stringify(response?.data));
          if (response.status === 200) {
              const user = response.data;
              console.log(user);
              signIn(user, () => navigate(fromPage, { replace: true }));
          } else {
              console.error('Login failed');
              // Можно добавить обработку ошибок здесь
          }
        } catch (error) {
          if (!error?.response) {
            console.log('No Server Response');
          }else if (error.response?.status === 400) {
            console.log('Missing Username or Password');
          }else if (error.response?.status === 401) {
            console.log('Unauthorized');
          }else {
            console.log('Login Failed');
          }
        }
    }

  return (
    <div>
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Name: <input name="login" />
        </label>
        <label>
            Password: <input name="password" />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export {LoginPage};
