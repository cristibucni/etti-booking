const mongoose = require('mongoose')
const Schema = mongoose.Schema

/** Create Schema */
const BuildingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    campus: {
        type: String,
        required: true,
    },
})

module.exports = Building = mongoose.model('buildings', BuildingSchema)
