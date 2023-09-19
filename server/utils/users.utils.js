const User = require('../models/users.model');

const signup = async (user) => {
  try {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Cannot create user', error);
  }
}

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email: email });
    if (user && user.password === password) {
      return user;
    } else {
      throw new Error("Please use correct credentials");
    }
  } catch (error) {
    console.error("Cannot find user", error);
  }
}

const changePassword = async (userId,currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    if (user && user.password === currentPassword) {
      user.password = newPassword;
      await user.save();
      return user;
    } else {
      throw new Error("Please use correct credentials");
    }
  } catch (error) {
    throw error;
  }
}

const updateProfilePicture = async (userId,newProfilePicture) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.profilePictureUrl = newProfilePicture;
      await user.save();
      return user;
    } else {
      throw new Error("Please use correct credentials");
    }
  } catch (error) {
    throw error;
  }
}

const updateContactDetails = async (userId,updatedContactDetails) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      Object.assign(user, updatedContactDetails)
      const updatedUser = await user.save();
      return updatedUser;
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    throw error;
  }
}

const findUserByPhoneNumber = async (phoneNumber) => {
  try {
    const userByPhoneNumber = await User.findOne({ phoneNumber })
    if (userByPhoneNumber) {
      return userByPhoneNumber;
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    throw error
  }
}

module.exports = { signup, login, changePassword, updateProfilePicture, updateContactDetails, findUserByPhoneNumber };