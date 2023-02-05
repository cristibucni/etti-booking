const express = require('express')
const router = express.Router()
const passport = require('passport')

const Role = require('../../models/Role')

router.get(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Role.find()
            .then((roles) => res.json(roles))
            .catch((err) =>
                res.status(404).json({ noProjectFound: 'No roles found' })
            )
    }
)

router.post(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const role = new Role({
            name: req.body.name,
        })
        role.save()
            .then((role) => res.json(role))
            .catch()
    }
)

module.exports = router
