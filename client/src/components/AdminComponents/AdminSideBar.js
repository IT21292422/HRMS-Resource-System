import React from "react";
import {Link} from "react-router-dom";
function AdminSideBar() {
    return(
        <div class="nav flex-column nav-pills bg-primary sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="/dash/admin/users">Users</Link>
            <Link class="nav-link" to="/dash/admin/Attendance">Attendance</Link>
            <Link class="nav-link" to="/dash/admin/AdminReqLeave">Leave Request</Link>
            <Link class="nav-link" to="/dash/admin/AllPayRolls">PayRolls</Link>
            <Link class="nav-link" to="/dash/admin/AllPaySlips">Payslips</Link>
            <Link class="nav-link" to="/dash/admin/resourcesList">Resources</Link>
            <Link class="nav-link" to="/dash/admin/resume/search">Resume</Link>
            <Link class="nav-link" to="/dash/admin/vacancy/search">Vacancy</Link>
            <Link class="nav-link" to="/dash/admin/VehicleList">Vehicle</Link>
            <Link class="nav-link" to="/dash/admin/RouteList">Route</Link>
            <Link class="nav-link" to="/dash/admin/TransportPaymentList">Transport Payment</Link>
        </div>
    );
}

export default AdminSideBar;