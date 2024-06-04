import { Outlet } from 'react-router-dom';
import { CustomLink } from './CustomLink'

const Layout = () => {
    return (
        <>
            <header>
                <CustomLink to="/">Дом</CustomLink>  
                <CustomLink to="/timetablePupil">Расписание как ученика</CustomLink>
                <CustomLink to="/timetableTeacher">Расписание как преподавателя</CustomLink>
                <CustomLink to="/qrgen">Генерация qr-кода</CustomLink>
                <CustomLink to="/qrscanner">Сканирование qr-кода</CustomLink>
                <CustomLink to="/admin">Админ-панель</CustomLink>
                <CustomLink to="/statistic">Отчёты</CustomLink>
                <CustomLink to="/profile">Профиль</CustomLink>
            </header>

            <main className="container">
                <Outlet />
            </main>

            <footer className="container">&copy; Залупа З. З.</footer>
        </>
    )
}

export {Layout}
