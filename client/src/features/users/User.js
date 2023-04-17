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

                <td class={cellStatus}>{user.empID}</td>
                <td class={cellStatus}>{user.fullname}</td>  
                <td class={cellStatus}>{user.username}</td>
                <td class={cellStatus}>{user.employee_type}</td>
                <td class={cellStatus}>{user.department}</td>    
                <td class={cellStatus}>{user.position}</td>

                <td class={cellStatus}>{userRolesString}</td>
                          
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
