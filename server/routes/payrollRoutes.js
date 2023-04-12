const express = require('express')
const router = express.Router()
const {
    getPayrolls,
    setPayroll,
    updatePayroll,
    deletePayroll,
    searchpayrolls
} = require('../controllers/payrollController')

router.get('/',getPayrolls)
router.post('/',setPayroll)
router.put('/:id',updatePayroll)
router.delete('/:id',deletePayroll)
router.get('/search',searchpayrolls)

module.exports = router