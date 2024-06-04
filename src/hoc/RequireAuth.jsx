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

    let isInclude = false;
    for (const role of user?.roles) {
      isInclude = allowedRoles.includes(role);
    }

    if (isInclude) {
      return children;
    }

    return(
      <>
        У вас недостаточно прав!
      </>
    );
}

export {RequireAuth};
