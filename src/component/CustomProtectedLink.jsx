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
                color: match ? '#0dcaf0' : 'black',
            }}
            {...props}
        >
            {children}
        </Link>);
    }
  
    const hasAccess = user.roles.some(role => allowedRoles.includes(role));

    if (!hasAccess) {
        return null;
    }

    return (
        <Link
            to={to}
            style={{
                color: match ? '#0dcaf0' : 'black',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}

export {CustomProtectedLink};
