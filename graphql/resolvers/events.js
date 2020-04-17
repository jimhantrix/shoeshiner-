
const Event = require('../../models/event');
const User = require ('../../models/user');


const { transformEvent } = require('./merge');


//module
module.exports = {
  events: async () => { // Execute asynchronously as soon as promise is returned
    try {
      const events = await Event.find()
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) { //handle errors
      throw err;
    }
  },
  // Create event function
  createEvent: async (args, req) => {
    if (!req.isAuth){// verify user
      throw new Error('Unautheticated');
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    let createdEvent; // Once created
    try { // try and wait until promise is settles and return result
      const result = await event.save()
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId); //user id

      if (!creator) { //Check if user exists
        throw new Error('User not found.');
      }
      creator.createdEvents.push(event);
      await creator.save() //save the event and its creator

      return createdEvent;
    } catch (err) { // Else if invalid provide error
      console.log(err)
      throw err;
    }
  }

};
