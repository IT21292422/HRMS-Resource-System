import React, { useState } from "react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddTransportPayment() {

  const [Company, setCompany] = useState("");
  const [Account_No, setAccount_No] = useState();
  const [Date, setDate] = useState("");
  const [Distance, setDistance] = useState();
  //const [Total,setTotal] = useState();

  const Total = Distance * 100 + 40000

  function sendData(e) {
    e.preventDefault();


    const newTransportPayment = {
      Company,
      Account_No,
      Date,
      Distance,
      Total
    }

    axios.post("http://localhost:5000/api/TransportPayment/", newTransportPayment).then(() => {
      //alert("TransportPayment Added")
      window.location.replace('/dash/admin/TransportPaymentList')

    }).catch((err) => {
      console.log(err.response.data)
    })

  }


  return (
    <>
      <button type="button" class="btn btn-primary col-2 " data-bs-toggle="modal" data-bs-target="#ReqLeaveForm">
        Add Transport Payment
      </button>
      <div class="modal fade" id="ReqLeaveForm" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="ReqLeaveFormLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">Transport Payment</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <Form onSubmit={sendData}>
                <div class="row">
                  <div className="col-6">
                    <label class="form-label" for="Company">Company</label>
                    <input type="text" class="form-control" id="Company" placeholder="Enter Company"
                      onChange={(e) => {
                        setCompany(e.target.value);
                      }} />
                  </div>


                  <div className="col-6">
                    <label class="form-label" for="Account_No">Account_No</label>
                    <input type="number" class="form-control" id="Account_No" placeholder="Enter Account_No"
                      onChange={(e) => {
                        setAccount_No(e.target.value);
                      }} />
                  </div>

                  <div className="col-6">
                    <label class="form-label" for="Date">Date</label>
                    <input type="date" class="form-control" id="Date" placeholder="Enter Date"
                      onChange={(e) => {
                        setDate(e.target.value);
                      }} />
                  </div>

                  <div className="col-6">
                    <label class="form-label" for="Distance">Distance</label>
                    <input type="number" class="form-control" id="Distance" placeholder="Enter Distance"
                      onChange={(e) => {
                        setDistance(e.target.value);
                      }} />
                  </div>

                  <div className="col-6">
                    <label class="form-label" for="Total">Total</label>
                    <input type="number" class="form-control" id="Total" value={Total} disabled />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                    <Button  type="submit" class="btn btn-primary">Pay</Button>
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

