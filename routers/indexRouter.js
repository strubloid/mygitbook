const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    res.render('index')
})

// exporting the router
module.exports = router