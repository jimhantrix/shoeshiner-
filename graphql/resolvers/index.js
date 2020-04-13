const bcrypt = require ('bcryptjs');
const Event = require ('../../models/event');
const User = require ('../../models/user');

// Event( resolvers)
const events = async eventIds => {
  try {// I want to check for errors
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
const user = async  userId =>{
  try{
     const user = wait = User.findById(userId);
      return {
        ...user._doc,
         _id: user.id,
         createdEvents: events.bind(this, user._doc.createdEvents)
       };
     }catch (err){
    throw err;
  }
};

module.exports ={
    events: async () =>{// Execute asynchronously as soon as it is available
      try{
      const events = await Event.find()
          return events.map( event => {
            return { ...event._doc,
               _id: event.id,
              date: new Date(event._doc.date).toISOString(),
              creator: user.bind(this, event._doc.creator)
          };
        });
      }catch (err){
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
      const result = await event
      .save()
        createdEvent = { ...result._doc, _id: result._doc._id.toString(),
        date: new Date(event._doc.date).toISOString(),
        creator: user.bind(this, result._doc.creator)
      };
      const creator = await User.findById("5e94340bd30c4685063c1591");//user id
        if (!creator) {//Check user
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
    createUser: async args => {// Check if user does not exist
      try{//
      const existingUser = await User.findOne({email:  args.userInput.email})
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

        const user = new User({
          email: args.userInput.email,
          password: hashedPassword
        })
        const result = await user.save();
        return {...result._doc,password:null, _id: result.id};
      } catch (err){
        throw err;
    }
  }
};
