import React from "react";
import {Link} from "react-router-dom";
function AdminSideBar() {
    return(
        <div class="nav flex-column nav-pills bg-light sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="/exitQR">Exit</Link>
            <Link class="nav-link" to="/readQR">Entry</Link>
            <Link class="nav-link" to="/dash/admin/users">Users</Link>
            <Link class="nav-link" to="/dash/admin/Attendance">Attendance</Link>
            <Link class="nav-link" to="/dash/admin/AdminReqLeave">Leave Request</Link>
            <Link class="nav-link" to="/dash/admin/AllPayRolls">PayRolls</Link>
            <Link class="nav-link" to="/dash/admin/AllPaySlips">Payslips</Link>
            <Link class="nav-link" to="/dash/admin/resourcesList">Resources</Link>
            <Link class="nav-link" to="/dash/admin/resume/search">Resume</Link>
            <Link class="nav-link" to="/dash/admin/vacancy/search">Vacancy</Link>
        </div>
    );
}

export default AdminSideBar;