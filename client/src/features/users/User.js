import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'



const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/admin/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table-warning'

        return (
            <tr className="table__row user">

                <td>{user.empID}</td>
                <td>{user.fullname}</td>  
                <td>{user.username}</td>
                <td>{user.employee_type}</td>
                <td>{user.department}</td>    
                <td>{userRolesString}</td>
                          
                <td>
                    <button
                        class="btn btn-primary"
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User
