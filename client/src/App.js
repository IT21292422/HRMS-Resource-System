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
import AddResource from "./components/AddResource"
import EditResource from "./components/EditResource"
import ResourceDetails from "./components/ResourceDetails"
import ResourcesList from "./components/ResourcesList"
import AssignEmployee from "./components/AssignEmployee"

//arudchyans
import ResumeList from './features/resume/ResumeList'
import EditResume from './features/resume/EditResume'
import NewResumeForm from './features/resume/NewResumeForm'
import VacancyList from './features/vacancy/VacancyList'
import EditVacancy from './features/vacancy/EditVacancy'
import NewVacancyForm from './features/vacancy/NewVacancyForm'
import ResumeSearch from './features/resume/ResumeSearch'
import VacancySearch from './features/vacancy/VacancySearch'
import Reporting from './features/resume/Reporting'

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

                  {/* vacancy and jobs */}
                  <Route path="resume">
                    <Route index element={<ResumeSearch />} />
                    <Route path=":id" element={<EditResume />} />
                    <Route path="new" element={<NewResumeForm />} />
                    {/* <Route path="search" element={<ResumeSearch />} /> */}
                    <Route path="reporting" element={<Reporting />} />
                  </Route>

                  <Route path="vacancy">
                    <Route index element={<VacancySearch />} />
                    <Route path=":id" element={<EditVacancy />} />
                    <Route path="new" element={<NewVacancyForm />} />
                    {/* <Route path="search" element={<VacancySearch />} /> */}
                  </Route>

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
