import React, { useEffect, useState } from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import useAxiosPrivate from '../hook/useAxiosPrivate';
import Button from 'react-bootstrap/Button';

const PROFILE_URL = 'user/current';

export const ProfilePage = () => {
  const {signOut} = useAuth();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const goOut = () => signOut(() => navigate('/', {replace: true}));

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosPrivate.get(PROFILE_URL);

        if (response.status !== 200) {
          throw new Error('Ошибка при загрузке данных');
        }            
        
        console.log(response?.data);
        setProfileData(response?.data);
      } catch (error) {
        console.error('Произошла ошибка:', error);
      }
    };

    fetchProfile();
  }, [axiosPrivate]);

  // Функция для преобразования числовых ролей в строковые
  const getRoleName = (role) => {
    switch (role) {
      case 0:
        return 'Студент';
      case 1:
        return 'Учитель';
      case 99:
        return 'Админ';
      default:
        return 'Неизвестная роль';
    }
  };

  // Функция для преобразования числового статуса в строковый
  const getStatusName = (status) => {
    switch (status) {
      case 0:
        return 'В академе';
      case 1:
        return 'В процессе обучения';
      case 2:
        return 'Отчислен';
      default:
        return 'Неизвестный статус';
    }
  };

  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Header as="h5" className="text-center">Профиль</Card.Header>
              <Card.Body>
                <Card.Text><strong>Логин:</strong> {profileData?.login}</Card.Text>
                <Card.Text><strong>ФИО:</strong> {profileData?.name}</Card.Text>
                <Card.Text><strong>Группа:</strong> {profileData?.group}</Card.Text>
                <Card.Text><strong>Статус:</strong> {getStatusName(profileData?.status)}</Card.Text>
                <Card.Text><strong>Роль:</strong> {profileData?.roles?.map(getRoleName).join(', ')}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={6} className="d-flex justify-content-end">
            <Button variant="info" onClick={goOut}>Выйти из профиля</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};