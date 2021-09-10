const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const router = Router()

router.post(
    '/register',
    [
        check('email', 'incorrect Email').isEmail(),
        check('password', 'Minimal 5 letters').isLength({min: 5})
    ],
    async (req, res) =>{
    try{
        
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'incorrect registration data'})
        }
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if (candidate){
          return res.status(400).json({message: 'user is already exists' })
        }
       
         const heshedPassword = await bcrypt.hash(password, 12)
      
         const user = new User({email, password: heshedPassword})
      
         await user.save()

         res.status(201).json({message: 'User Created'})
    }catch (e) {
        res.status(500).json({message: 'Its Error , Retry'})
    }
})
router.post('/login',
 [
    check('email', 'Enter Your Email').normalizeEmail().isEmail(),
    check('password', "Enter Your password").exists()
 ],
 async (req, res) =>{
    try{
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array(), message: 'incorrect registration when logging '})
        }
        const {email,password} = req.body

        const user = await User.findOne({ email })

        if (!user){
            return res.status(400).json({message: 'User is not found'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"})
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            { expiresIn: '1d'}
        )
          res.json({token})
    }catch (e) {
        res.status(500).json( {message: 'Its Error , Retry'} )
    }
})
module.exports = router
