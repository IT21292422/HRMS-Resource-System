const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const corsOptions = require ('./config/corsOptions')
require("dotenv").config({ path: "./.env" });
const port = process.env.PORT || 5000;
const resourceRoutes = require('./routes/resourceRoutes')

//payroll

const {errorHandlerAbdul } = require('./middleware/errorMiddleware.js')

const Db = process.env.ATLAS_URI;
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//user management
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const { logger, logEvents } = require('./middleware/logger')
app.use(cors(corsOptions))
// app.use(logger)
app.use(cookieParser())
//end user management

app.use(cors());



// Set up CORS middleware to allow requests from localhost:3000 with credentials
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

//user management routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))

//payroll management
app.use('/api/payrolls', require('./routes/payrollRoutes'))

//resource management
app.use("/api/resources",resourceRoutes)

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

//http://localhost:5000/SuspiciousEmpLeave
const suspiciousEmpLeaveData = require("./routes/SuspiciousEmpLeave");
app.use('/SuspiciousEmpLeave', suspiciousEmpLeaveData);




app.use(errorHandler)