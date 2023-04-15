import React, { useState, useEffect } from "react";
import axios from "axios";
import RouteName from "./AddRoute";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddApplyTransport() {
  const [Emp_id, setEmp_id] = useState("");
  const [routesName, setRoutesName] = useState("");
  const [Vehicle_Type, setVehicle_Type] = useState("");
  const [Emp_Contact_Number, setEmp_Contact_Number] = useState("");
  const [Routes, setRoutes] = useState([]);

  useEffect(() => {
    function getRoutes() {
      axios
        .get("http://localhost:5000/api/Route/")
        .then((res) => {
          console.log(res.data);
          setRoutes(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getRoutes();
  }, []);

  const renderRoutes = Routes.map((route) => (
    <option key={route.Route_Name} value={route.Route_Name}>
      {route.Route_Name}
    </option>
  ));

  function handleSubmit(e) {
    e.preventDefault();
    let Route_Name = routesName
    const newApplyTransport = {
      Emp_id,
      Route_Name,
      Vehicle_Type,
      Emp_Contact_Number,
    };

    axios
      .post("http://localhost:5000/api/ApplyTransport/", newApplyTransport)
      .then(() => {
        //alert("Application  Added");
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  return (
    <>
      <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#applytrans">
        Apply Transport
      </button>
      <div class="modal fade" id="applytrans" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Apply Transport</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Form onSubmit={handleSubmit}>
                <div class="row">
                  <div className="col-6">
                    <Form.Group controlId="Emp_id">
                      <Form.Label>Emp_id</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Emp_id"
                        value={Emp_id}
                        onChange={(e) => setEmp_id(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-6">
                    <Form.Group controlId="Route_Name">
                      <Form.Label>Route Name</Form.Label>
                      <Form.Select
                        defaultValue=""
                        onChange={(e) => setRoutesName(e.target.value)}
                      >
                        <option value="" disabled>Select Routes</option>
                        {renderRoutes}
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="col-6">
                    <Form.Group controlId="Vehicle_Type">
                      <Form.Label>Vehicle Type</Form.Label>
                      <Form.Select
                        defaultValue=""
                        onChange={(e) => setVehicle_Type(e.target.value)}
                      >
                        <option value="" disabled>Select Vehicle Type</option>
                        <option value="Bus">Bus</option>
                        <option value="Van">Van</option>
                      </Form.Select>
                    </Form.Group>
                  </div>

                  <div className="col-6">
                    <Form.Group controlId="Emp_Contact_Number">
                      <Form.Label>Emp_Contact_Number</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Emp_Contact_Number"
                        value={Emp_Contact_Number}
                        onChange={(e) => setEmp_Contact_Number(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <Button type="submit" className="btn btn-primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}  