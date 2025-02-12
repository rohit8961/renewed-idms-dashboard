import { useEffect, useState } from 'react';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Login from './Private/Login';
import PrivateRouter from './Private/PrivateRoute';
import Agency from './components/Tables/Agency';
import Games from './components/Tables/Games';
import BssaStaff from './components/BSSA-Staff/BssaStaff';
import EmpAgency from './components/EMP-Agency/EmpAgency';
import KiscStaff from './components/KISC-Staff/KiscStaff';
import KiscPlayer from './components/KISC-Player/KiscPlayer';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (



    <Routes>
      <Route element={<PrivateRouter />}>
        <Route element={<DefaultLayout><Outlet /></DefaultLayout>}>
          <Route
            index
            element={
              <>
                <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <ECommerce />
              </>
            }
          />
          <Route
            path="/calendar"
            element={
              <>
                <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Calendar />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Profile />
              </>
            }
          />
          <Route
            path="/forms/form-elements"
            element={
              <>
                <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormElements />
              </>
            }
          />
          <Route
            path="/forms/form-layout"
            element={
              <>
                <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <FormLayout />
              </>
            }
          />
          <Route
            path="/tables"
            element={
              <>
                <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Tables />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/chart"
            element={
              <>
                <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Chart />
              </>
            }
          />
          <Route
            path="/ui/alerts"
            element={
              <>
                <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Alerts />
              </>
            }
          />
          <Route
            path="/ui/buttons"
            element={
              <>
                <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Buttons />
              </>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <>
                <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignIn />
              </>
            }
          />
          <Route
            path="/auth/signup"
            element={
              <>
                <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <SignUp />
              </>
            }
          />
          <Route
            path="/agency"
            element={
              <>
                <PageTitle title="Agency data" />
                <Agency />
              </>
            }
          />
          <Route
            path="/games"
            element={
              <>
                <PageTitle title="Games data" />
                <Games />
              </>
            }
          />
          <Route
            path="/bssa-staff"
            element={
              <>
                <PageTitle title="Bssa staff data" />
                <BssaStaff />
              </>
            }
          />
          <Route
            path="/emp-agency"
            element={
              <>
                <PageTitle title="Empanelled agency data" />
                <EmpAgency />
              </>
            }
          />
          <Route
            path="/kisc-staff"
            element={
              <>
                <PageTitle title="Kisc staff data" />
                <KiscStaff />
              </>
            }
          />
          <Route
            path="/kisc-player"
            element={
              <>
                <PageTitle title="Kisc player data" />
                <KiscPlayer />
              </>
            }
          />
        </Route>
      </Route>
      <Route
        path="/login"
        element={
          <>
            <PageTitle title="Login page" />
            <Login />
          </>
        }
      />
    </Routes>

  );
}

export default App;
