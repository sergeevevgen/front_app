import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth'

const RequireAuth = ({children, allowedRoles}) => {
  const location = useLocation();
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/login' state={{from: location}} />
  }

  if (!allowedRoles || allowedRoles?.length === 0) {
    return children;
  }
    
    // Проверка, есть ли у пользователя хотя бы одна из разрешенных ролей
  const hasAccess = user.roles.some(role => allowedRoles.includes(role));

  if (hasAccess) {
    return children;
  }

  return(
    <>
      У вас недостаточно прав!
    </>
  );
}

export {RequireAuth};
