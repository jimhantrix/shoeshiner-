const DataLoader = require ('dataloader');
const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');

const eventLoader = new DataLoader((eventIds) =>{
  return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
  return User.find({_id: {$in: userIds}});
});

// Event( resolvers)
const events = async eventIds => {
  try { // checking for errors
    const events = await Event.find({
      _id: {
        $in: eventIds
      }
    });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) { // if any errors give an error
    throw err;
  }
};
const singleEvent = async eventId => {
  try {
    const event = await eventLoader.load(eventId.toString());
    return event;
  } catch (err) {
    throw err;
  }
};
// Users
const user = async userId => { // We are creating a new users
  try {
    const user = await userLoader.load(userId.toString());
    return { // User with their created event
      ...user._doc,
      _id: user.id,
      createdEvents: eventLoader.load.bind(this, user._doc.createdEvents)
    };
  } catch (err) { //otherwise give an error
    throw err;
  }
};


const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;


// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
