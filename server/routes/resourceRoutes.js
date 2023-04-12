const route = require('express').Router()
const {createResource,getAllResources,getResourceById,updateResource,assignEmployee,revokeEmployee,deleteResource} = require('../controllers/resourceController')

route.post("/createResource",createResource)
route.get("/getResource", getAllResources)
route.get("/getResource/:id",getResourceById)
route.put("/updateResource/:id",updateResource)
route.put("/assignEmployee/:id",assignEmployee)
route.put("/revokeEmployee/:id",revokeEmployee)
route.delete("/deleteResource/:id",deleteResource)

module.exports = route