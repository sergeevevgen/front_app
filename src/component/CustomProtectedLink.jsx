import { Link, useMatch } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';

const CustomProtectedLink = ({children, to, allowedRoles, ...props}) => {
    const {user} = useAuth();
    
    const match = useMatch({
        path: to,
        end: to.length === 1,
    });

    if (!user) {
        return null;
    }
  
    if (!allowedRoles || allowedRoles?.length === 0) {
        return (<Link
            to={to}
            style={{
                color: match ? 'var(--color-active)' : 'white',
            }}
            {...props}
        >
            {children}
        </Link>);
    }
  
    let isInclude = false;
    for (const role of user?.roles) {
        isInclude = allowedRoles.includes(role);
    }
  
    if (!isInclude) {
        return null;
    }

    return (
        <Link
            to={to}
            style={{
                color: match ? 'var(--color-active)' : 'white',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export {CustomProtectedLink};
