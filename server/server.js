const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOptions = require ('./config/corsOptions')
require("dotenv").config({ path: "./.env" });

//zaq
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const { logger, logEvents } = require('./middleware/logger')
app.use(cors(corsOptions))

// app.use(logger)
app.use(cookieParser())
const port = process.env.PORT || 5000;

const Db = process.env.ATLAS_URI;
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

const connection = mongoose.connection;
connection.once("open", ()=> {
    console.log("Successfully connected to MongoDB.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cors());
app.use(express.json());

//Leave and attendance management system

//http://localhost:5000/EmployeeReqLeave
const employeeLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/EmployeeReqLeave', employeeLeaveRequestData);

//http://localhost:5000/AdminReqLeave
const adminEmpLeaveRequestData = require("./routes/EmployeeLeaveReq");
app.use('/AdminReqLeave', adminEmpLeaveRequestData);

//http://localhost:5000/Attendance
const employeeAttendanceData = require("./routes/EmployeeAttendance");
app.use('/Attendance', employeeAttendanceData);

//http://localhost:3000/SuspiciousEmpLeave
const suspiciousEmpLeaveData = require("./routes/SuspiciousEmpLeave");
app.use('/SuspiciousEmpLeave', suspiciousEmpLeaveData);


//zaqwan
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use(errorHandler)