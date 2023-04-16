import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaFileAlt, FaMoneyBillAlt, FaFileInvoiceDollar, FaBook, FaSearch, FaCar, FaMap, FaCreditCard, FaBriefcase, FaFile } from "react-icons/fa";

function EmployeeSideBar() {
    return (
        <div class="nav flex-column nav-pills bg-primary sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <Link class="nav-link" to="">Home</Link>
            <Link class="nav-link" to="">Profile</Link>
            <Link class="nav-link" to="">Messages</Link>
            <Link class="nav-link" to="/dash/emp/EmployeeReqLeave">
                <FaFileAlt class="sidebar-icon" />
                Request Leave
            </Link>
        </div>
    );
}

export default EmployeeSideBar;