
function PaySlipCard({ payroll }) {
    return (
    <>
        <div class="col-3">
            <div class="card">
                <h5 class="card-header">{payroll.Name}</h5>
                <div class="card-body">
                <table>
                    <tr >
                        <th>
                            Payments
                        </th>
                        <th>
                            Amount (Rs.)
                        </th>

                    </tr>
                    <tr >
                        <th>
                            Basic Salary
                        </th>

                        <td align="right">
                            {payroll.BaseSalary}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            Overtime
                        </th>


                        <td align="right">
                            {payroll.otPaid}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            Meal Allowance
                        </th>


                        <td align="right">
                            {payroll.mealAllowance}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            Tarvel Allowance
                        </th>

                        <td align="right" >
                            {payroll.travelAllowance}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            Gross Salary
                        </th>


                        <td align="right">
                            {payroll.travelAllowance + payroll.BaseSalary + payroll.mealAllowance + payroll.otPaid}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            Taxations
                        </th>
                        <td align="right">
                            {payroll.taxes}
                        </td>

                    </tr >
                    <tr>
                        <th>
                            EPF
                        </th>

                        <td  align="right">
                            {payroll.epf}
                        </td>

                    </tr >
                    <tr >
                        <th colspan="1b ">
                            Salary
                        </th>


                        <td  align="right">
                            {payroll.Salary}
                        </td>
                    </tr >

                </table >
                </div>
            </div>
        </div>

        {/* <div>
            <div class="col-6">
            <h1>{payroll.Name}</h1>
                <div class="row justify-content-center">
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Employee ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Position</th>
                                <th scope="col">Options</th>
                            </tr>
                        </thead>
                        <tbody>{
                            filteredPayrolls.map((payroll) => {
                                return (
                                    <tr key={payroll._id}>

                                        <th scope="row">{payroll.eid}</th>
                                        <td>{payroll.Name}</td>
                                        <td>{payroll.department}</td>
                                        <td>{payroll.position}</td>
                                        <td>
                                            <button
                                                disabled={payroll.isLoading}
                                                class="btn btn-danger"
                                                onClick={() => dispatch(deletePayRoll(payroll._id))}>
                                                Delete
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() => navigate(`/UpdatePayroll/${payroll._id}`)}>
                                                Update
                                            </button>
                                        </td>
                                        <td>
                                            <button class="btn btn-primary" onClick={() => navigate(`/IndividualPayroll/${payroll._id}`)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div> */}
    </>
    )

}

export default PaySlipCard