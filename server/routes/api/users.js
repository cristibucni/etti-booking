const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

/** Load Input Validation */
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

/** Load User model */
const User = require('../../models/User')
const Role = require('../../models/Role')

/** @route GET api/users/test
 *  @desc Tests users route
 *  @access Public
 */
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }))

/** @route GET api/users
 *  @desc User list
 *  @access Private
 */
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Role.findById(req.user.role).then(role => {
            if (role.name === 'SUPERUSER') {
            User.find()
                .select('-password')
                .sort({ date: -1 })
                .populate('role')
                .then((users) => res.json(users))
                .catch((err) =>
                    res.status(404).json({ noProjectFound: 'No users found' })
                )
        } else {
            res.status(403).json({
                forbidden: 'You have no access to this area.',
            })
    }})
       
    }
)

/** @route GET api/users/register
 *  @desc User registration
 *  @access Public
 */
router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            errors.email = 'Email already exists'
            return res.status(400).json(errors)
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role,
                isValidated: false,
            })

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err
                    newUser.password = hash
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch()
                })
            })
        }
    })
})

/** @route POST api/users/login
 *  @desc Login User / Returning JWT Token
 *  @access Public
 */
router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    User.findOne({ email })
        .populate('role')
        .then((user) => {
            /** Check for user */
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            /** Check Password */
            bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    /** User match & Create JWT Payload*/
                    const payload = {
                        id: user.id,
                        role: user.role,
                        name: user.name,
                    }
                    /** Sign token */
                    jwt.sign(
                        payload,
                        keys.appSecret,
                        { expiresIn: keys.expireIn },
                        (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token,
                            })
                        }
                    )
                } else {
                    errors.password = 'Password is incorrect'
                    return res.status(400).json(errors)
                }
            })
        })
})
router.patch('/:id', (req, res) => {
    console.log(req.body)
    console.log(req.params.id)

    User.findOne({ _id: req.params.id })
        .then((user) => {
          
            user.isValidated = true
            user.save().then(newUser => res.json(newUser))
        })
})

module.exports = router
