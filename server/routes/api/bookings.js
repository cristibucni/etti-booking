const express = require('express')
const router = express.Router()
const passport = require('passport')

const Booking = require('../../models/Booking')

router.get(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Booking.find()
            .populate('user', '-password')
            .populate('room')
            .then((data) => res.json(data))
            .catch((err) =>
                res.status(404).json({ noProjectFound: 'No bookings found' })
            )
    }
)

router.post(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const booking = new Booking({
            user: req.body.user,
            room: req.body.room,
            startTs: req.body.startTs,
            endTs: req.body.endTs,
        })
        booking
            .save()
            .then((booking) => res.json(booking))
            .catch()
    }
)

module.exports = router
