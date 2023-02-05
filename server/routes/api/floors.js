const express = require('express')
const router = express.Router()
const passport = require('passport')

const Floor = require('../../models/Floor')

router.get(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const buildingId = req.query.buildingId
        Floor.find({ building: buildingId })

            .populate('building')
            .populate('rooms')
            .then((floors) => res.json(floors))
            .catch((err) =>
                res.status(404).json({ noProjectFound: 'No floors found' })
            )
    }
)

router.post(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Floor.insertMany(req.body)
            .then((response) => res.json(response))
            .catch((err) => res.status(400).json('Error: ' + err))
    }
)

module.exports = router
