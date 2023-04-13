import React from "react";
import { useEffect } from 'react'
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

function NavBar() {
    const navigate = useNavigate()

    const { username, status } = useAuth()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess)
            navigate('/')
    }, [isSuccess, navigate])

    return (
        <nav class="navbar fixed-top bg-light">
            <div class="container-fluid">
                <div> </div>
                <h6>{username} : {status}</h6>
                <button class="btn btn-outline-success" type="submit" onClick={sendLogout}>Logout</button>
            </div>
        </nav>
    );
}

export default NavBar;