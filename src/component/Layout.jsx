import { Outlet } from 'react-router-dom';
import { CustomProtectedLink } from './CustomProtectedLink'

const ROLES = {
    'Pupil': 0,
    'Teacher': 1,
    'Admin': 99
  }


const Layout = () => {
    return (
        <>
            <header>
                <CustomProtectedLink to="/">Дом</CustomProtectedLink>  
                <CustomProtectedLink to="/timetablePupil" allowedRoles={[ROLES.Pupil]}>Расписание как ученика</CustomProtectedLink>
                <CustomProtectedLink to="/timetableTeacher" allowedRoles={[ROLES.Teacher]}>Расписание как преподавателя</CustomProtectedLink>
                <CustomProtectedLink to="/qrgen" allowedRoles={[ROLES.Teacher]}>Генерация qr-кода</CustomProtectedLink>
                <CustomProtectedLink to="/qrscanner" allowedRoles={[ROLES.Pupil]}>Сканирование qr-кода</CustomProtectedLink>
                <CustomProtectedLink to="/admin" allowedRoles={[ROLES.Admin]}>Админ-панель</CustomProtectedLink>
                <CustomProtectedLink to="/statistic">Отчёты</CustomProtectedLink>
                <CustomProtectedLink to="/profile">Профиль</CustomProtectedLink>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="container">&copy; Залупа З. З.</footer>
        </>
    )
}

export {Layout}
