import React from "react";
import { useEffect } from 'react'
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { useNavigate } from 'react-router-dom'

function NavBar() {
    const navigate = useNavigate()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) 
        navigate('/')
    }, [isSuccess,navigate])

    return(
        <nav class="navbar fixed-top bg-light">
            <div class="container-fluid">
                <a class="navbar-brand">HR system</a>
                <form class="d-flex" role="search">
                <button class="btn btn-outline-success" type="submit" onClick={sendLogout}>Logout</button>
                </form>
            </div>
        </nav>
    );
}

export default NavBar;