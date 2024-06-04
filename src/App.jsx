import { Routes, Route } from 'react-router-dom';

import { HomePage } from './page/HomePage';
// import { AboutPage } from './page/AboutPage';
// import { Blogpage } from './pages/Blogpage';
// import { Createpost } from './pages/Createpost';
// import { Editpost } from './pages/Editpost';
// import { Singlepage } from './pages/Singlepage';
import { NotFoundPage } from './page/NotFoundPage';
import { LoginPage } from './page/LoginPage';
import { ProfilePage } from './page/ProfilePage';
import { Layout } from './component/Layout'

import { RequireAuth } from './hoc/RequireAuth'
import { AuthProvider } from './hoc/AuthProvider'
import { TimetablePage } from './page/TimetablePage';
import { QRGenPage } from './page/QRGenPage';
import { QRScannerPage } from './page/QRScannerPage';
import { AdminPage } from './page/AdminPage';
import { StatisticPage } from './page/StatisticPage';
import { TimetableTeacherPage } from './page/TimetableTeacherPage';

const ROLES = {
  'Pupil': 0,
  'Teacher': 1,
  'Admin': 99
}

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* <Route path="about" element={<AboutPage />}>
              <Route path="contacts" element={<p>Our contact</p>} />
              <Route path="team" element={<p>Our team</p>} />
            </Route> */}
            {/* <Route path="about-us" element={<Navigate to="/about" replace />} />
            <Route path="posts" element={<Blogpage />} />
            <Route path="posts/:id" element={<Singlepage />} />
            <Route path="posts/:id/edit" element={<Editpost />} />
            <Route path="posts/new" element={
              <RequireAuth>
                <Createpost />
              </RequireAuth>
            } /> */}
            <Route path="qrgen" element={
              <RequireAuth allowedRoles={[ROLES.Teacher]}>
                <QRGenPage />
              </RequireAuth>
            } />
            <Route path="qrscanner" element={
              <RequireAuth allowedRoles={[ROLES.Pupil]}>
                <QRScannerPage />
              </RequireAuth>
            } />
            <Route path="profile" element={
              <RequireAuth allowedRoles={[ROLES.Pupil, ROLES.Teacher, ROLES.Admin]}>
                <ProfilePage />
              </RequireAuth>
            } />
            <Route path="timetablePupil" element={
              <RequireAuth allowedRoles={[ROLES.Pupil]}>
                <TimetablePage />
              </RequireAuth>
            } />
            <Route path="timetableTeacher" element={
              <RequireAuth allowedRoles={[ROLES.Teacher]}>
                <TimetableTeacherPage />
              </RequireAuth>
            } />
            <Route path="admin" element={
              <RequireAuth allowedRoles={[ROLES.Admin]}>
                <AdminPage />
              </RequireAuth>
            } />
            <Route path="statistic" element={
              <RequireAuth>
                <StatisticPage />
              </RequireAuth>
            } />
            <Route path="login" element={<LoginPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
    </AuthProvider>
  );
}

export default App;
