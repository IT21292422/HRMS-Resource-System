import { useEffect, useState } from "react"
import { useSelector, useDispatch } from 'react-redux'
//import { useNavigate } from "react-router-dom"
import { getPayRolls, reset } from "../features/payroll/payrollSlice"
import Spinner from './Spinner'
import PaySlipCard from "./PaySlipCard"
// import PayrollSearchBar from "./PayrollSearchBar"
import useAuth from "../hooks/useAuth"
function EmpIndPaySlips() {
    const { payrolls, isLoading, isError, message } = useSelector(state => state.payrolls)
    // const [filteredPayrolls, setFilteredPayrolls] = useState(payrolls)

    const { username } = useAuth()
    const dispatch = useDispatch()
    //const navigate = useNavigate()

    useEffect(() => {
        if (isError) {
            console.log(message)
        }

        dispatch(getPayRolls())

        return () => {
            console.log('unloading payslips')
            dispatch(reset())
        }

    }, [isError, dispatch, message])

    const filteredPayrolls = payrolls.filter((payroll) => {
        const name = payroll.username

        return name.includes(username)

    })
    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            {/* <div>
        <PayrollSearchBar handleSearch={handleSearch} />
        
      </div> */}

            {payrolls.length > 0 ? (
                <div class="leave-list">
                    <div class="row justify-content-center">
                        {filteredPayrolls.map((payroll) => (
                            <PaySlipCard key={payroll._id} payroll={payroll} />
                        ))}
                    </div>
                </div>) : (<h3>No payslips</h3>)}
        </>
    )
}

export default EmpIndPaySlips