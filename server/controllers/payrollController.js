const asyncHandler = require('express-async-handler')
const Payroll = require('../models/payrollModel')
const {calculateSalary,calculateDeductions} = require('../controllers/payrollCalculator')
//@desc Get payrolls
//@route GET/ api/payrolls
//@access Private
const getPayrolls = asyncHandler(async(req,res)=>{
    const payrolls = await Payroll.find()

    res.status(200).json(payrolls)
})

//@desc Set payrolls
//@route POST/ api/payrolls
//@access Private
const setPayroll = asyncHandler(async(req,res)=>{
    const {fullname,empID,department,position,otHours}=req.body

      if(!fullname || !empID || !department || !position){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const {SalaryPaid,mealAllow,travelAllow,OtPayment,BaseSalary} = calculateSalary(department,position,otHours)
    
    const{epfCalculated,FinalSalary,taxes,deductions} = calculateDeductions(SalaryPaid)
    
    const payroll = await Payroll.create({
        Name: fullname,
        eid : empID,
        department:department,
        position:position,
        mealAllowance:mealAllow,
        travelAllowance:travelAllow,
        epf:epfCalculated,
        taxes:taxes,
        deductions:deductions,
        otHours:otHours,
        otPaid:OtPayment,    
        Salary:FinalSalary,
        BaseSalary:BaseSalary
    })
    
    res.status(200).json(payroll)
})

//@desc Update payrolls
//@route PUT/ api/payrolls:id
//@access Private
const updatePayroll = asyncHandler(async(req,res)=>{
    const payroll = await Payroll.findById(req.params.id)
    
    const {department,position,otHours} = req.body

    const {SalaryPaid,mealAllow,travelAllow,BaseSalary} = calculateSalary(department,position,otHours)

    const{epfCalculated,FinalSalary,taxes,deductions} = calculateDeductions(SalaryPaid)

    if(!payroll){
        res.status(400)
        throw new Error('Payroll not found')
    }
    
    const updatedPayRollData={
        ...req.body,
        epf:epfCalculated,
        taxes:taxes,
        deductions:deductions,
        mealAllowance:mealAllow,
        travelAllowance:travelAllow,
        Salary:FinalSalary,
        BaseSalary:BaseSalary
    }

    const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id,updatedPayRollData,{
        new:true,
    })
    
    res.status(200).json(updatedPayroll)
})


//@desc delete payrolls
//@route DELETE/ api/payrolls:id
//@access Private
const deletePayroll = asyncHandler(async(req,res)=>{
    const payroll = await Payroll.findById(req.params.id)

    if(!payroll){
        res.status(400)
        throw new Error('Payroll not found')
    }
    await payroll.remove()
    
    res.status(200).json({ id: req.params.id })
})

const searchpayrolls = asyncHandler(async(req,res)=>{
    const {query} = req.query
    try{
        const results = await Payroll.find({
            $or:[
                {department:{$regex:query}}
            ],
        })
        
        res.json(results)
        
    }catch(error){
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
})

module.exports ={
    getPayrolls,
    setPayroll,
    updatePayroll,
    deletePayroll,
    searchpayrolls
}

// // Route to bulk update payroll information for users
// app.post('/payroll', (req, res) => {
//     // Determine the salary and bonus amounts based on the user's job role and other criteria
//     // In this example, we're assuming that the salary and bonus amounts are provided in the request body
//     const { salary, bonus } = req.body;
  
//     User.find({})
//       .then(users => {
//         const payrollDocs = users.map(user => ({
//           userId: user._id,
//           salary: salary,
//           bonus: bonus,
//           deductions: salary * 0.1 // Assuming a 10% deduction rate
//         }));
  
//         // Bulk insert the payroll documents into the payrolls collection
//         Payroll.insertMany(payrollDocs)
//           .then(() => {
//             console.log('Payroll information updated for all users');
  
//             res.status(200).send({
//               message: 'Payroll information updated for all users'
//             });
//           })
//           .catch(err => {
//             console.error('Error updating payroll information for users', err);
  
//             res.status(500).send({
//               error: 'Internal server error'
//             });
//           });
//       })
//       .catch(err => {
//         console.error('Error retrieving user data', err);
  
//         res.status(500).send({
//           error: 'Internal server error'
//         });
//       });
//   });
  