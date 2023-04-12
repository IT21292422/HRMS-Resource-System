import React,{useState, useEffect} from 'react'
import { Link, useNavigate,redirect } from 'react-router-dom'
import axios from "axios"

const AddResource = () => {
    
    const [name,setName] = useState("")
    const [type,setType] = useState("")
    const [quantity,setQuantity] = useState("")
    const [invoiceNo,setInvoiceNo] = useState("")
    const [supplierName,setSupplierName] = useState("")
    const [orderedDate,setOrderDate] = useState("")
    const [imageURL,setImageURL] = useState("")

    const add = (e) => {
        e.preventDefault() //Like preventing page to refresh

        const resources = {
            name,
            type,
            quantity,
            invoiceNo,
            supplierName,
            orderedDate,
            imageURL
        }

        if(name === "" ||type === "" || quantity === "" || invoiceNo === "" || supplierName === "" || orderedDate === "" || imageURL === ""){
            //So if either any of this is empty the function will alert and return back
            alert("All the fields are mandatory")
            return
        }

        //the props addResourceHandler is passed from App.js
        //this.props.addResourceHandler(this.state)
            axios.post("http://localhost:5000/api/resources/createResource",resources).then(() =>{
            alert("Inventory added Successfully")
            //To clear the input text box once the submit button isclicked
            setName("")
            setType("")
            setQuantity("")
            setInvoiceNo("")
            setSupplierName("")
            setOrderDate("")
            setImageURL("")
            //To go back to Resources List after submitting the form
            window.location.replace('/dash/admin/resourcesList')
            })
        .catch((error) => {
            console.log(error.response.data)
        })
            
        
    }

        return (
            <div class="container">
            <form onSubmit={add}>
                <div>
                    <label for="name" class="form-label">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Enter Resource Name" onChange={(e) => setName(e.target.value)}/> {/*e is event*/}
                <br/>
                </div>
                <div>
                <select class="form-select" aria-label="Default select example" name="type" onChange={(e) => setType(e.target.value)}>
                    <option selected>Select Resource Type</option>
                    <option value="Device">Device</option>
                    <option value="Stationary">Stationary</option>      
                </select>
                <br/>    
                </div>
                <div>
                    <label for="quantity" class="form-label">Quantity</label>
                    <input type="text" class="form-control" id="quantity" placeholder="Enter the quantity" onChange={(e) => setQuantity(e.target.value)}/>
                <br/>
                </div>
                <div>
                    <label for="invoiceNo" class="form-label">Invoice No</label>
                    <input type="text" class="form-control" id="invoiceNo" placeholder="Enter the Invoice Number" onChange={(e) => setInvoiceNo(e.target.value)}/>
                <br/>
                </div>
                <div>
                    <label for="supplierName" class="form-label">Supplier Name</label>
                    <input type="text" class="form-control" id="supplierName" placeholder="Enter the Supplier Name" onChange={(e) => setSupplierName(e.target.value)}/>
                <br/>
                </div>
                <div>
                    <label for="orderDate" class="form-label">Ordered Date</label>
                    <input type="date" class="form-control" id="orderDate" onChange={(e) => setOrderDate(e.target.value)}/>
                <br/>
                </div>
                <div>
                    <label for="imageURL" class="form-label">Image URL</label>
                    <input type="text" class="form-control" id="imageURL" onChange={(e) => setImageURL(e.target.value)}/>
                <br/>
                </div>
                <button type="submit" class="btn btn-primary">Add</button>
            </form>
            </div>
        )
    
}

export default AddResource