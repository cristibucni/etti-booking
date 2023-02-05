const mongoose = require('mongoose')
const Schema = mongoose.Schema

/** Create Schema */
const FloorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'buildings',
    },
    rooms: {
        type: [Schema.Types.ObjectId],
        ref: 'rooms',
    },
})

module.exports = Floor = mongoose.model('Floors', FloorSchema)
