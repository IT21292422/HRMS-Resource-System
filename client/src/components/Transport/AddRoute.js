import React, { useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddRoute() {

  const [Route_Name, setRoute_Name] = useState("");
  const [Vehicle_Type, setVehicle_Type] = useState("");
  const [Vehicle_No, setVehicle_No] = useState("");
  const [Arrival_Time, setArrival_Time] = useState("");
  const [Starting_Point, setStarting_Point] = useState("");
  const [Ending_Point, setEnding_Point] = useState("");
  const [Distance, setDistance] = useState();


  function sendData(e) {
    e.preventDefault();

    const newRoute = {
      Route_Name,
      Vehicle_Type,
      Vehicle_No,
      Arrival_Time,
      Starting_Point,
      Ending_Point,
      Distance
    }

    axios.post("http://localhost:5000/api/Route/", newRoute).then(() => {
      //alert("Route Added")
      window.location.replace('/dash/admin/RouteList')

    }).catch((err) => {
      console.log(err.response.data)
    })

  }


  return (
    <>
      <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#addroute">
        Add Routes
      </button>
      <div class="modal fade" id="addroute" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="addrouteLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Add Routes</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Form onSubmit={sendData}>
                <div class="row">
                  <div className="col-6">
                    <label class="form-label" for="Route_Name">Route_Name</label>
                    <input type="text" class="form-control" id="Route_Name" placeholder="Enter Route_Name"
                      onChange={(e) => {
                        setRoute_Name(e.target.value);
                      }} />
                  </div>

                  <div className="col-6">
                    <label class="form-label" for="Vehicle_Type">Vehicle_Type</label>
                    <select class="form-select" id="Vehicle_Type" name="Vehicle_Type" onChange={(e) => setVehicle_Type(e.target.value)}>
                      <option selected>Select Vehicle Type</option>
                      <option value="Bus">Bus</option>
                      <option value="Van">Van</option>
                    </select>
                  </div>

                  <div className="col-6">
                    <label class="form-label" for="Vehicle_No">Vehicle_No</label>
                    <input type="text" class="form-control" id="Vehicle_No" placeholder="Enter Vehicle_No"
                      onChange={(e) => {
                        setVehicle_No(e.target.value);
                      }} />
                  </div>


                  <div className="col-6">
                    <label class="form-label" for="Arrival_Time">Arrival_Time</label>
                    <input type="time" class="form-control" id="Arrival_Time" placeholder="Enter Arrival_Time"
                      onChange={(e) => {
                        setArrival_Time(e.target.value);
                      }} />
                  </div>


                  <div className="col-6">
                    <label class="form-label" for="Starting_Point">Starting_Point</label>
                    <input type="text" class="form-control" id="Starting_Point" placeholder="Enter Starting_Point"
                      onChange={(e) => {
                        setStarting_Point(e.target.value);
                      }} />
                  </div>


                  <div className="col-6">
                    <label class="form-label" for="Ending_Point">Ending_Point</label>
                    <input type="text" class="form-control" id="Ending_Point" placeholder="Enter Ending_Point"
                      onChange={(e) => {
                        setEnding_Point(e.target.value);
                      }} />
                  </div>


                  <div className="col-6">
                    <label class="form-label" for="Distance">Distance</label>
                    <input type="number" class="form-control" id="Distance" placeholder="Enter Distance"
                      onChange={(e) => {
                        setDistance(e.target.value);
                      }} />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <Button  type="submit" class="btn btn-primary">Add</Button>
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

