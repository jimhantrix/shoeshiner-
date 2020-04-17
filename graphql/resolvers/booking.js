const Event = require('../../models/event');
const User = require('../../models/user');

const { transformBooking,transformEvent } = require('./merge');


//module
module.exports = {

  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unautheticated');
    }
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },
  // Create bookings
  bookEvent: async args => {
    const fetchedEvent = await Event.findOne({
      _id: args.eventId
    });
    const booking = new Booking({
      user: "5e95cfa133fd841075cc89b0",
      event: fetchedEvent
    });
    const result = await booking.save();
    return transformBooking(result);
  },
  //Cancel Booking
  cancelBooking: async args => {
    if (!req.isAuth) {
      throw new Error('Unautheticated!');
    }
    try {
      const booking = await Booking.findById(args.bookingId).populate('event')
      const event = transformEvent(booking.event);
      await Booking.deleteOne({
        _id: args.bookingId
      });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
