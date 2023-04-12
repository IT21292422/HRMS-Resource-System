import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";
import AllPayrolls from "../AllPayrolls";
import AllPaySlips from "../AllPaySlips";
import UpdatePayroll from "../UpdatePayroll";
import IndividualPayroll from "../IndividualPayroll";
import AddPayRoll from "../AddPayRoll";

function AdminContent() {
    return(
        <div class="content">
            <Routes>
                <Route>
                    <Route path="/AdminReqLeave" element={<AdminReqLeave />} />
                    <Route path="/Attendance" element={<Attendance />} />
                    <Route path='/AllPayrolls' element={<AllPayrolls/>} />
                    <Route path='/AllPaySlips' element={<AllPaySlips/>} />
                    <Route path='UpdatePayroll/:id' element={<UpdatePayroll />} />
                    <Route path='IndividualPayroll/:id' element={<IndividualPayroll />} />
                    <Route path='AddPayRoll' element={<AddPayRoll />} />
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;