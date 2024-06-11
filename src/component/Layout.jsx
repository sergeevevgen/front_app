import { Outlet } from 'react-router-dom';
import { CustomProtectedLink } from './CustomProtectedLink'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const ROLES = {
    'Pupil': 0,
    'Teacher': 1,
    'Admin': 99
}

const Layout = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto navbar-nav">
                        <CustomProtectedLink to="/" className="nav-link">Дом</CustomProtectedLink>
                        <CustomProtectedLink to="/timetablePupil" allowedRoles={[ROLES.Pupil]} className="nav-link">Расписание группы</CustomProtectedLink>
                        <CustomProtectedLink to="/timetableTeacher" allowedRoles={[ROLES.Teacher]} className="nav-link">Расписание проведения занятий</CustomProtectedLink>
                        <CustomProtectedLink to="/qrgen" allowedRoles={[ROLES.Teacher]} className="nav-link">Генерация qr-кода</CustomProtectedLink>
                        <CustomProtectedLink to="/qrscanner" allowedRoles={[ROLES.Pupil]} className="nav-link">Сканирование qr-кода</CustomProtectedLink>
                        <CustomProtectedLink to="/admin" allowedRoles={[ROLES.Admin]} className="nav-link">Админ-панель</CustomProtectedLink>
                        <CustomProtectedLink to="/statistic" className="nav-link">Отчёты</CustomProtectedLink>
                        <CustomProtectedLink to="/profile" className="nav-link">Профиль</CustomProtectedLink>
                    </Nav>
                    {!user && (
                        <Button variant="info" onClick={() => navigate('/login')}>
                        Войти
                        </Button>
                    )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main className="container">
                <Outlet />
            </main>

            <footer className="footer">&copy; УлГТУ</footer>
        </>
    )
}

export {Layout}
