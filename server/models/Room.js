const mongoose = require('mongoose')
const Schema = mongoose.Schema

/** Create Schema */
const RoomSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = Room = mongoose.model('rooms', RoomSchema)
