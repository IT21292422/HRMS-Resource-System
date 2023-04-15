import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";
import AllPayrolls from "../AllPayrolls";
import AllPaySlips from "../AllPaySlips";
import UpdatePayroll from "../UpdatePayroll";
import IndividualPayroll from "../IndividualPayroll";
import AddPayRoll from "../AddPayRoll";
import ResourcesList from "../resource/ResourcesList";
import AddResource from "../resource/AddResource";
import AssignEmployee from "../resource/AssignEmployee";
import EditResource from "../resource/EditResource";
import ResourceDetails from "../resource/ResourceDetails";
import UsersList from "../../features/users/UsersList";
import EditUser from "../../features/users/EditUser";

function AdminContent() {
    return (
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/Attendance" element={<Attendance />} />
                    <Route path='/AllPayrolls' element={<AllPayrolls />} />
                    <Route path='/AllPaySlips' element={<AllPaySlips />} />
                    <Route path='UpdatePayroll/:id' element={<UpdatePayroll />} />
                    <Route path='IndividualPayroll/:id' element={<IndividualPayroll />} />
                    <Route path='AddPayRoll' element={<AddPayRoll />} />
                    <Route path='resourcesList' element={<ResourcesList />} />
                    <Route path='addResource' element={<AddResource />} />
                    <Route path='assignEmployee/:id' element={<AssignEmployee />} />
                    <Route path='editResource/:id' element={<EditResource />} />
                    <Route path='resource/:id' element={<ResourceDetails />} />
                    <Route path='users' element={<UsersList />} />
                    <Route path='users/:id' element={<EditUser/>}/>

                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;