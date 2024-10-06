import User from "../models/User.js";


export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true } // so that the response will give the Updated data.
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res) => {
    try {

      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted");
    } catch (err) {
      next(err);
    }
  };

export const getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

export const getUsers = async (req, res) => {
    // const failed = true
    // const err = new Error()
    // err.status = 400
    // err.message = "Sorry not found!"
    // if(failed) return next(err);

    // const failed = true;
    // if(failed) return next(createError(401, "You are not authenticated"))

    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };
