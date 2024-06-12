import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from '../hook/useAuth'
import axios from '../api/axios';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const LOGIN_URL = 'User/login';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const {signIn} = useAuth();

  const fromPage = location.state?.from?.pathname || '/';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!login || !password) {
      return;
    }
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
      } else if (error.response?.status === 400) {
        console.log('Missing Username or Password');
      } else if (error.response?.status === 401) {
        console.log('Unauthorized');
      } else {
        console.log('Login Failed');
      }
    }
  }

  return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header as="h1" className="text-center">Авторизация</Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="login">
                    <Form.Label>Логин</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Введи логин системы УлГТУ" 
                      value={login}
                      onChange={(e) => setLogin(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="formPassword" className="mt-3">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control 
                      type="password" 
                      placeholder="Введи пароль системы УлГТУ" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" className="mt-4">
                    Войти
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  )
}

export {LoginPage};
