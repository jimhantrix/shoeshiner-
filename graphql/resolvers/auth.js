const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
  createUser: async args => {
    try {
      const existingUser = await User.findOne({email: args.userInput.email});
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: null,
        _id: result.id
      };
    } catch (err) {
      throw err;
    }
  },
  // log in - verify user
  login: async ({email, password}) => {
    const user = await User.findOne({email: email});
    if (!user) { // check user exist
      throw new Error('User does not exist!');
    }
    const isEqaul = await bcrypt.compare(password, user.password);
    if (!isEqaul) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, 'somesupersecrectkeytokensuper', {
      expiresIn: '1h'
    });
    return {userId: user.id, token:token, tokenExpiration: 1 };
  }
};
