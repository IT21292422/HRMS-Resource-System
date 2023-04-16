import React from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarCheck, FaFileAlt, FaMoneyBillAlt, FaFileInvoiceDollar, FaBook, FaSearch, FaCar, FaMap, FaCreditCard, FaBriefcase, FaFile } from "react-icons/fa";

function AdminSideBar() {
  return (
    <div style={{backgroundColor: '#212529', padding: '20px'}}>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h3 style={{color: '#fff', fontWeight: 'bold'}}>Admin Panel</h3>
      </div>
      <div className="nav flex-column nav-pills bg-primary sidebar" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <Link className="nav-link" to="/dash/admin/users">
          <FaUser className="sidebar-icon" />
          Users
        </Link>
        <Link className="nav-link" to="/dash/admin/Attendance">
          <FaCalendarCheck className="sidebar-icon" />
          Attendance
        </Link>
        <Link className="nav-link" to="/dash/admin/AdminReqLeave">
          <FaFileAlt className="sidebar-icon" />
          Leave Request
        </Link>
        <Link className="nav-link" to="/dash/admin/AllPayRolls">
          <FaMoneyBillAlt className="sidebar-icon" />
          PayRolls
        </Link>
        <Link className="nav-link" to="/dash/admin/AllPaySlips">
          <FaFileInvoiceDollar className="sidebar-icon" />
          Payslips
        </Link>
        <Link className="nav-link" to="/dash/admin/resourcesList">
          <FaBook className="sidebar-icon" />
          Resources
        </Link>
        <Link className="nav-link" to="/dash/admin/resume/search">
          <FaFile className="sidebar-icon" />
          Resume
        </Link>
        <Link className="nav-link" to="/dash/admin/vacancy/search">
          <FaBriefcase className="sidebar-icon" />
          Vacancy
        </Link>
        <Link className="nav-link" to="/dash/admin/VehicleList">
          <FaCar className="sidebar-icon" />
          Vehicle
        </Link>
        <Link className="nav-link" to="/dash/admin/RouteList">
          <FaMap className="sidebar-icon" />
          Route
        </Link>
        <Link className="nav-link" to="/dash/admin/TransportPaymentList">
          <FaCreditCard className="sidebar-icon" />
          Transport Payment
        </Link>
      </div>
      <style>
        {`
        .sidebar-icon {
          margin-right: 10px;
          color: #fff;
        }

        .nav-link {
          color: #fff;
          padding: 10px;
          margin: 5px 0;
          display: flex;
          align-items: center;
          border-radius: 10px;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          background-color:#800080;
        }
        `}
      </style>
    </div>
  );
}

export default AdminSideBar;
