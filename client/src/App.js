import AdminPanel from "./components/AdminComponents/AdminPanel";
import EmployeePanel from "./components/EmployeeComponents/EmployeePanel";
import { Route, Routes, Outlet } from "react-router-dom";
import AdminReqLeave from "./components/AdminComponents/AdminReqLeave";
import ExitQR from "./components/QRComponents/ExitQR";
import Attendance from "./components/AdminComponents/Attendance";
import EntranceQR from "./components/QRComponents/EntranceQR";
import EmployeeReqLeave from "./components/EmployeeComponents/EmployeeReqLeave";
import ViewDisplay from "./components/ViewComponent/ViewDisplay";

//payroll management
import AllPayrolls from "./components/AllPayrolls";
import AllPaySlips from "./components/AllPaySlips";
import UpdatePayroll from "./components/UpdatePayroll";
import AddPayRoll from "./components/AddPayRoll"; 
import IndividualPayroll from "./components/IndividualPayroll";
//zaqwan
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import UsersList from "./features/users/UsersList";
// import EditUser from './features/users/EditUser'
// import NewUserForm from './features/users/NewUserForm'
import Prefetch from './features/auth/Prefetch';
import PersistLogin from './features/auth/PersistLogin';
import RequireAuth from './features/auth/RequireAuth';
import { ROLES } from './config/roles';

//akaml
import AddResource from "./components/resource/AddResource";
import EditResource from "./components/resource/EditResource"
import ResourceDetails from "./components/resource/ResourceDetails"
import ResourcesList from "./components/resource/ResourcesList"
import AssignEmployee from "./components/resource/AssignEmployee"

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

              <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                <Route path="admin" element={<AdminPanel />}>
                  {/* leave and attendance management */}
                  <Route exact path="AdminReqLeave" element={<AdminReqLeave />} />
                  <Route exact path="Attendance" element={<Attendance />} />
                  
                  {/* payroll management */}
                  <Route path='AllPayrolls' element={<AllPayrolls />} />
                  <Route path='AddPayRoll' element={<AddPayRoll />} />
                  <Route path='UpdatePayroll/:id' element={<UpdatePayroll />} />
                  <Route path='AllPaySlips' element={<AllPaySlips />} />
                  <Route path='IndividualPayroll/:id' element={<IndividualPayroll />} />
                
                  {/* resource management */}
                  <Route path='resourcesList' element={<ResourcesList />} />
                  <Route path='addResource' element={<AddResource />} />
                  <Route path='assignEmployee/:id' element={<AssignEmployee />} />
                  <Route path='editResource/:id' element={<EditResource />} />
                  <Route path='resource/:id' element={<ResourceDetails />} />

                  {/* user management */}
                  <Route path='users' element={<UsersList />} />
                </Route>
              </Route>
              <Route path="emp" element={<EmployeePanel />}>
                <Route path="EmployeeReqLeave" element={<EmployeeReqLeave />} />
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
