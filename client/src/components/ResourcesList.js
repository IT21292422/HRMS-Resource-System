import React, { useState, useEffect } from 'react'
import ResourceCard from './ResourceCard'
import { Link } from 'react-router-dom'
import axios from "axios"
import AddResource from './AddResource'

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
        <>
            <div class="request">
                <div class="row justify-content-end">
                    {/* <AddResource></AddResource> */}
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
            <div class="search">
                <div class="row justify-content-center">
                    <input type="text" class="form-control search-bar" id="searchResource" placeholder="Enter Search Keyword" value={Keyword} onChange={(e) => setKeyword(e.target.value)} />
                </div>
            </div>
            <br />
            <div class="leave-list">
                <table class="table table-striped table-hover">
                    <thead>
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
                    <tbody>
                        {renderResourcesList}
                    </tbody>
                </table>
            </div>
        </>
    )

}

export default ResourcesList