import AdminPanel from "./components/AdminComponents/AdminPanel";
import EmployeePanel from "./components/EmployeeComponents/EmployeePanel";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminReqLeave from "./components/AdminComponents/AdminReqLeave";
import ExitQR from "./components/QRComponents/ExitQR";
import Attendance from "./components/AdminComponents/Attendance";
import EntranceQR from "./components/QRComponents/EntranceQR";
import EmployeeReqLeave from "./components/EmployeeComponents/EmployeeReqLeave";
import ViewDisplay from "./components/ViewComponent/ViewDisplay";

//zaqwan
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
// import UsersList from './features/users/UsersList'
// import EditUser from './features/users/EditUser'
// import NewUserForm from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';

function App() {
  return (
    //<AdminPanel></AdminPanel>
    //<EmployeePanel></EmployeePanel> 
    //<ViewDisplay></ViewDisplay>
    // <Routes>
    //     <Route path="/admin" element={<AdminPanel />}>
    //         <Route exact path="/admin/AdminReqLeave" element={<AdminReqLeave />} />
    //         <Route exact path="/admin/Attendance" element={<Attendance />} />
    //     </Route>
    //     <Route path="/emp" element={<EmployeePanel />}>
    //         <Route path="/emp/EmployeeReqLeave" element={<EmployeeReqLeave />} />
    //     </Route>
    //     <Route exact path="/readQR" element={<EntranceQR />} />
    //     <Route exact path="/exitQR" element={<ExitQR />} />
    // </Routes>
    <Routes>
      {/* <Route path="/" element={<Layout />}> */}
      {/*Public routes */}
      {/* <Route element={<Public />} /> */}
      <Route path="/" element={<Login />} />

      {/*Protected routes */}
      <Route element={<PersistLogin />} >
        <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />} >
          <Route element={<Prefetch />} >

            <Route path="dash" element={<DashLayout />}>

              <Route index element={<Welcome />} />

              {/* <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="admin" element={<AdminPanel />}>
                  <Route path="AdminReqLeave" element={<AdminReqLeave />} />
                  <Route path="Attendance" element={<Attendance />} />
                </Route>
              </Route> */}
              {/* <Route path="dash/*"> */}
              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="admin" element={<AdminPanel />}>
                  <Route exact path="AdminReqLeave" element={<AdminReqLeave />} />
                  <Route exact path="Attendance" element={<Attendance />} />
                </Route>
              </Route>






            </Route>{/* End Dash */}
          </Route>
        </Route>
      </Route>

      {/* End Protected routes*/}
      {/* <Route>
      <Route path="dash/*">
                <Route path="admin/*" element={<AdminPanel />}>
                  <Route exact path="AdminReqLeave" element={<AdminReqLeave />} />
                  <Route exact path="Attendance" element={<Attendance />} />
                </Route>
              </Route>
      </Route> */}


      {/* </Route> */}
      <Route exact path="/readQR" element={<EntranceQR />} />
      <Route exact path="/exitQR" element={<ExitQR />} />
    </Routes >
  );
}

export default App;
