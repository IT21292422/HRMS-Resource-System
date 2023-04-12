import React,{useState, useEffect} from 'react'
import { Link, useNavigate,redirect , useParams } from 'react-router-dom'
import axios from "axios"

const AssignEmployee = () => {

    //To get the id from URL
    const {id} = useParams()
    
    const [quantity,setQuantity] = useState("")

    const [employees,setEmployees] = useState([])
    const [employeeName,setEmployeeName] = useState("")

    const retrieveEmployees = () => {
        axios.get("http://localhost:5000/users").then((res) =>{
            setEmployees(res.data)
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    }
  
    useEffect(() => {
      retrieveEmployees()
    },[])

    
    const renderEmployee = employees.map((employees) => {
            return (
            <>
            <option value={employees.fullname}>{employees.fullname}</option>
            <input type="hidden" value="employees._id"/>
            </>
            )        
    })

    
    

    const assign = (e) => {
        e.preventDefault() //Like preventing page to refresh

        const employee = {
            employeeName
        }

        console.log(employeeName)
    
            axios.put(`http://localhost:5000/api/resources/assignEmployee/${id}`,employee).then(() =>{
                console.log(employee)
            alert("Employee assigned Successfully")      
            //To go back to Resources List after submitting the form
            window.location.replace(`/dash/admin/resource/${id}`)
            })
            .catch((error) => {
             console.log(error)
             })
            
    } 

        return (
            <div class="container">
            <form onSubmit={assign}>
                <select class="form-select" aria-label="Default select example" name="empAssigned" onChange={(e) => setEmployeeName(e.target.value)}>
                <option selected>Select Employee</option>
                {renderEmployee}
                </select>
                <br/>
                <button type="submit" class="btn btn-primary">Assign Employee</button>
            </form>
            </div>
        )
    
}

export default AssignEmployee