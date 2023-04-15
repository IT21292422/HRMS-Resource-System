import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminReqLeave from "./AdminReqLeave";
import Attendance from "./Attendance";
import AllPayrolls from "../AllPayrolls";
import AllPaySlips from "../AllPaySlips";
import UpdatePayroll from "../UpdatePayroll";
import IndividualPayroll from "../IndividualPayroll";
import AddPayRoll from "../AddPayRoll";
import ResourcesList from "../ResourcesList";
import AddResource from "../AddResource";
import AssignEmployee from "../AssignEmployee";
import EditResource from "../EditResource";
import ResourceDetails from "../ResourceDetails";
import UsersList from "../../features/users/UsersList";
import ResumeList from "../../features/resume/ResumeList";
import EditResume from "../../features/resume/EditResume";
import NewResumeForm from "../../features/resume/NewResumeForm";
import VacancyList from "../../features/vacancy/VacancyList";
import EditVacancy from "../../features/vacancy/EditVacancy";
import NewVacancyForm from "../../features/vacancy/NewVacancyForm";
import ResumeSearch from "../../features/resume/ResumeSearch";
import VacancySearch from "../../features/vacancy/VacancySearch";
import Reporting from "../../features/resume/Reporting";

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
                    
                    <Route path="resume">
                        <Route index element={<ResumeList />} />
                        <Route path=":id" element={<EditResume />} />
                        <Route path="new" element={<NewResumeForm />} />
                        <Route path="search" element={<ResumeSearch />} />
                        <Route path="reporting" element={<Reporting />} />

                    </Route>

                    <Route path="vacancy">
                        <Route index element={<VacancyList />} />
                        <Route path=":id" element={<EditVacancy />} />
                        <Route path="new" element={<NewVacancyForm />} />
                        <Route path="search" element={<VacancySearch />} />
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default AdminContent;