const express = require("express")
const router = express.Router()

const {login,signup} = require("../controllers/Auth")
const {Auth,isStudent,isAdmin} = require("../middlewares/Auth");


router.post('/login',login)
router.post('/signup',signup)

//protected routes
router.get('/student',Auth,  (req,res) =>{
    res.json({
        success:true,
        message: `welcome to protected route for tests`
    })
})
router.get('/student',Auth, isStudent, (req,res) =>{
    res.json({
        success:true,
        message: `welcome to protected route for students`
    })
})
router.get('/student',Auth, isAdmin, (req,res) =>{
    res.json({
        success:true,
        message: `welcome to protected route for Admin`
    })
})

module.exports = router