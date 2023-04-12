// const mongoose = require('mongoose');
// const User = require('../models/userModel');
// const Payroll = require('../models/payrollModel');
// const asyncHandler = require('express-async-handler');

// const addPayrollData = asyncHandler(async (req, res) => {
//   try {
//     const users = await User.find({}, 'Name eid department _id position');

//     const payrollEntries = users.map(user => ({
//       ID:user._id,
//       Name: user.Name,
//       eid: user.eid,
//       department: user.department,

//     }));

//     await Payroll.insertMany(payrollEntries, { ordered: false });

//     console.log('Payroll information updated for all users');
//   } catch (err) {
//     if(err.code==11000){
//       console.error('Tried to duplicate entry')
//     }
//     else
//       console.error('Error retrieving user data', err);
//   }
// });

// module.exports = { addPayrollData };
