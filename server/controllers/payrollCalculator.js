
function calculateSalary(department, position, otHours) {
  let Salary=0, mealAllow=0, travelAllow=0,otPayment=0,BaseSalary=0

  if (department == "Finance") {
    if (position == "Executive")
      BaseSalary = 125000
    else if (position == "Intermediate")
      BaseSalary = 100000
    else if (position == "Middle Management")
      BaseSalary = 75000
    else if (position == "Entry level")
      BaseSalary = 50000
  } 
  else if (department == "IT") {
    if (position == "Executive")
      BaseSalary = 150000
    else if (position == "Intermediate")
      BaseSalary = 125000
    else if (position == "Middle Management")
      BaseSalary = 100000
    else if (position == "Entry level")
      BaseSalary = 75000
  } 
  else if (department == "HR") {
    if (position == "Executive")
      BaseSalary = 100000
    else if (position == "Intermediate")
      BaseSalary = 75000
    else if (position == "Middle Management")
      BaseSalary = 50000
    else if (position == "Entry level")
      BaseSalary = 25000
  }

  mealAllow = BaseSalary * 0.05
  travelAllow = BaseSalary * 0.1
  const otRate = 100
  otPayment=otRate*otHours

  Salary = otPayment+mealAllow+travelAllow+BaseSalary
  
  return {
    SalaryPaid:Salary,
    mealAllow:mealAllow,
    travelAllow:travelAllow,
    OtPayment:otPayment,
    BaseSalary:BaseSalary
  }
}


function calculateDeductions(SalaryPaid){
  
  let taxes=0

  if(SalaryPaid>100000)
    taxes=SalaryPaid*0.1

  const epf=0.08

  let epfCalculated=epf*SalaryPaid

  let deductions = epfCalculated+taxes

  let FinalSalary = SalaryPaid-deductions

  
  return{
    epfCalculated,
    FinalSalary,
    taxes,
    deductions
  }
}

module.exports = {
  calculateSalary,
  calculateDeductions
}