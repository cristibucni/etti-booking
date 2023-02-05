const mongoose = require('mongoose')
const Schema = mongoose.Schema

/** Create Schema */
const BookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    room: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'rooms',
    },
    startTs: {
        type: Schema.Types.Date,
        required: true,
    },
    endTs: {
        type: Schema.Types.Date,
        required: true,
    },
})

module.exports = Booking = mongoose.model('bookings', BookingSchema)
