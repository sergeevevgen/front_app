import React from 'react';
import { useAuth } from '../hook/useAuth';
import { useNavigate } from 'react-router-dom';

export const ProfilePage = () => {
  const {user, signOut} = useAuth();
  const navigate = useNavigate();

  const goHome = () => navigate('/', {replace: true});
  const goOut = () => signOut(() => navigate('/', {replace: true}));

  return (
    <>
      <div>Идентификатор: {user.id}</div>
      <div>Логин: {user.name}</div>
      <div>Токен доступа: {user.accessToken}</div>
      <div>Токен обновления: {user.refreshToken}</div>
      <div>Роли: {user.roles.map((role, index) => (
        <div key={index}>{role}</div>))}
      </div>
      <button onClick={goHome}>Домой</button>
      <button onClick={goOut}>Выйти из профиля</button>
    </>
  );
};