import React, { useState } from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const UsersList = () => {

  const{
      data: users,
      isLoading,
      isSuccess,
      isError,
      error
  } = useGetUsersQuery('usersList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
})

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  
  const [search, setSearch] =useState('')
  console.log(search)


  if (isSuccess) {

    const { ids } = users

    /*const tableContent = ids?.length 
    && ids.map(userId => <User key={userId} userId={userId} 
    
       {...User.filter((user)=>{
            return search.toLowerCase()===''
            ? user
            : user.fullname.toLowerCase.includes(search);
        })}
    
    
    
    />)*/

    const tableContent = ids?.length && ids
    .filter(userId => {
        const user = users.entities[userId]
        return search.toLowerCase() === '' || user.fullname.toLowerCase().includes(search) || user.empID.includes(search) || user.employee_type.toLowerCase().includes(search)
    })
    .map(userId => <User key={userId} userId={userId} />);

    
        

    content = (

        <div>
            <header>
            <form className="search" >
                <input
                    className="search__input"
                    type="text"
                    id="search"
                    placeholder='Search users'
                    onChange={(e) => setSearch(e.target.value)}
                    
                />
                <button className="search__button">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </form>
        </header>
             
        
        
        <table className="table table--users">
            <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th user__empID">Employee ID</th>
                    <th scope="col" className="table__th user__fname">Full Name</th>
                    <th scope="col" className="table__th user__username">Username</th>
                    <th scope="col" className="table__th user__emptype">Employee Type</th>
                    <th scope="col" className="table__th user__dep">Department</th>
                    <th scope="col" className="table__th user__roles">Roles</th>
                    
                    <th scope="col" className="table__th user__edit">Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>

        </div>
    )
}

return content
}


export default UsersList