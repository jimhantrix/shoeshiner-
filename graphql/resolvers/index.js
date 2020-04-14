const bcrypt = require ('bcryptjs');
const Event = require ('../../models/event');
const User = require ('../../models/user');
const Booking = require('../../models/booking');

// Event( resolvers)
const events = async eventIds => {
  try {// checking for errors
      const events = await Event.find({ _id: {$in: eventIds}})
      events.map(event =>{
      return { ...event._doc,
     id: event.id,
     date: new Date(event._doc.date).toISOString(),
     creator: user.bind(this, event.creator)
      };
    }); return events;
  }catch (err){// if any errors give an error
    throw err;
    }
};
// Users
const user = async  userId =>{// We are creating a new users
  try{
     const user = wait = User.findById(userId);
      return {// User with their created event
        ...user._doc,
         _id: user.id,
         createdEvents: events.bind(this, user._doc.createdEvents)
       };
     }catch (err){//otherwise give an error
    throw err;
  }
};

module.exports ={
    events: async () =>{// Execute asynchronously as soon as promise is returned
      try{
      const events = await Event.find()
          return events.map( event => {
            return { ...event._doc,
               _id: event.id,
              date: new Date(event._doc.date).toISOString(),
              creator: user.bind(this, event._doc.creator)
          };
        });
      }catch (err){//handle errors
        throw err;
      }
    },
    bookings: async () =>{
      try{
        const  bookings =await Booking.find();
        return bookings.map(booking => {
          return { ...booking._doc,
             id: booking.id,
              createdAt: new Date(booking._doc.createdAt).toISOString(),
              updatedAt: new Date(booking._doc.createdAt).toISOString()
          };
        });
      }catch(err){
        throw err;
    }
  },
    // Create event function
    createEvent: async args => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: +args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: "5e94340bd30c4685063c1591"
      });
      let createdEvent; // Once created
      try{
      const result = await event// wait until promise is settles and return result
      .save()
        createdEvent = { ...result._doc, _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("5e94340bd30c4685063c1591");//user id
        if (!creator) {//Check if user exists
          throw new Error('User not found.');
        }
        creator.createdEvents.push(event);
       await creator.save()//save the event and its creator

       return createdEvent;
     }catch(err){// Else if invalid provide error
        console.log(err)
        throw err;
      }
    },
    // Create users
    createUser: async args => {// Check if user exists
      try{//check if there are any errors
      const existingUser = await User.findOne({email:  args.userInput.email})
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

        const user = new User({//
          email: args.userInput.email,
          password: hashedPassword
        })
        const result = await user.save();
        return {...result._doc,password:null, _id: result.id};
      } catch (err){// handle the errors
        throw err;
    }
  },
  bookEvent: async args =>{
    const fetchedEvent = await Event.findOne({_id: args.eventId});
    const booking = new Booking({
      user: "5e94340bd30c4685063c1591",
      event: fetchedEvent
    });
    const result = await booking.save();
    return {...result._doc,
      id: result.id,
      createdAt: new Date(booking._doc.createdAt).toISOString(),
      updatedAt: new Date(booking._doc.createdAt).toISOString()
    };
  }
};
