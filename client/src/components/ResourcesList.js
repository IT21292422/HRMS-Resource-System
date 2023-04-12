import React, { useState, useEffect } from 'react'
import ResourceCard from './ResourceCard'
import { Link } from 'react-router-dom'
import axios from "axios"

const ResourcesList = () => {

    const [resources, setResources] = useState([])
    const [Keyword, setKeyword] = useState('')

    //Retrieve all the resources
    const retrieveResources = () => {
        axios.get("http://localhost:5000/api/resources/getResource").then((res) => {
            setResources(res.data)
        })
            .catch((error) => {
                console.log(error.response.data)
            })
    }

    useEffect(() => {
        retrieveResources()
    }, [])

    const filteredResources = resources.filter((resource) => {
        const name = resource.name.toLowerCase()
        const type = resource.type.toLowerCase()
        const invoiceNo = resource.invoiceNo.toLowerCase()
        const supplierName = resource.supplierName.toLowerCase()
        const keyword = Keyword.toLowerCase()

        return name.includes(keyword) || type.includes(keyword) || invoiceNo.includes(keyword) || supplierName.includes(keyword)
    })

    const filterResourceTypeDevice = resources.filter((resource) => resource.type === "Device")
    console.log(filterResourceTypeDevice)
    const filterResourceTypeStationary = resources.filter((resource) => resource.type === "Stationary")
    console.log(filterResourceTypeStationary)

    const renderFilterResourceTypeDevice = filterResourceTypeDevice.map((resources) => {
        return (
            <ResourceCard resources={resources} />
        )
    })

    const renderFilterResourceTypeStationary = filterResourceTypeStationary.map((resources) => {
        return (
            <ResourceCard resources={resources} />
        )
    })

    const renderResourcesList = filteredResources.map((resources) => {
        return (
            <ResourceCard resources={resources} />
        )
    })
    return (
        <div>
            <div class="request">
                <div class="row justify-content-end">
                    <Link to="/dash/admin/addResource">
                        <button class="btn btn-primary">Add Resources</button>
                    </Link>
                </div>
            </div>
            <div>
                {/* <Link to="/addResource">
                    <button class="btn btn-primary">Add Resources</button>
                </Link> */}
                {/* <button class="btn btn-primary" onclick={renderFilterResourceTypeDevice}>Devices</button> */}
                {/* <button class="btn btn-primary" onclick={renderFilterResourceTypeStationary}>Stationaries</button> */}
            </div>
            <br />
            <div class="row justify-content-center">
                <input type="text" style={{ width: '50%', display: 'inline-block', textAlign: 'center' }} class="form-control" id="searchResource" placeholder="Enter Search Keyword" value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
            </div>
            <br />
            <div class="container">
                <table class="table table-borderless">
                    <thead class="table-primary">
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Quantity</th>
                            <th>Invoice No</th>
                            <th>Supplier Name</th>
                            <th>Ordered Date</th>
                            <th>Image URL</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody class="table-group-divider">
                        {renderResourcesList}
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default ResourcesList