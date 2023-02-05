const express = require('express')
const router = express.Router()
const passport = require('passport')

const Building = require('../../models/Building')

router.get(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Building.find()
            .then((buildings) => res.json(buildings))
            .catch((err) =>
                res.status(404).json({ noProjectFound: 'No roles found' })
            )
    }
)

router.post(
    '/',
    // passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const newBuilding = new Building({
            name: req.body.name,
            campus: req.body.campus,
        })
        newBuilding
            .save()
            .then((data) => res.json(data))
            .catch()
    }
)

module.exports = router
