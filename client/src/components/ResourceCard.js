import React,{useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import axios from "axios"

const ResourceCard = (props) => {

  const{_id,name,type,quantity,invoiceNo,supplierName,orderedDate,imageURL}=props.resources
  
  const id = _id.toString()

  const deleteResource = (_id) =>{
    axios.delete(`http://localhost:5000/api/resources/deleteResource/${id}`).then(() =>{
     alert("Resource Deleted")
     window.location.replace('/dash/admin/resourcesList')
  })
  .catch((error) => {
      console.log(error.response.data)
  })
}

  return (
    <>  
    <tr>
    <td>  <Link to={{pathname:`/dash/admin/resource/${id}`}} class="btn btn-outline-primary">{name}  </Link>  </td>
  
    <td>    {type}    </td> 
    <td>    {quantity}    </td>
    <td>    {invoiceNo}   </td>
    <td>    {supplierName}    </td>
    <td>    {orderedDate} </td>
    <td>    {imageURL} </td>
    <td>    
      <Link to={{ pathname: `/dash/admin/editResource/${id}`}} >
      <button type="button" class="btn btn-primary">Edit</button> 
      </Link>
      </td> 
    <td>    <button type="button" class="btn btn-danger" onClick={deleteResource}>Delete</button> </td> 
    </tr>
    </> 
  )
}

export default ResourceCard