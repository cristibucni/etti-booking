const express = require('express')
const router = express.Router()
const passport = require('passport')

const Room = require('../../models/Room')

router.get(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Room.find()
            .then((rooms) => res.json(rooms))
            .catch((err) =>
                res.status(404).json({ noProjectFound: 'No rooms found' })
            )
    }
)

router.post(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Room.insertMany(req.body)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json('Error: ' + err))
    }
)

module.exports = router
