const { Profile } = require("../models");

const profileController = {
  createProfile(req, res) {
    Profile.create(req.body)
      .then((dbProfileData) => res.json(dbProfileData))
      .catch((err) => res.status(500).json(err));
  },

  getProfiles(req, res) {
    profile.find()
      .then((profiles) => res.json(profiles))
      .catch((err) => res.status(500).json(err));
  },

  getSingleProfile(req, res) {
    Profile.findOne({ _id: req.params.profileId })
      .select("-__v")
      .populate("thoughts")
      .populate("friends")
      .then((profile) =>
        !profile
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json(profile)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateProfileById(req, res) {
    Profile.findOneAndUpdate(
      { _id: req.params.profileId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((profile) =>
        !profile
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json(profile)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteProfileById(req, res) {
    Profile.findOneAndRemove({ _id: req.params.profileId })
      .then((profile) =>
        !profile
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json({ message: "This Profile has been deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addProfileFriend(req, res) {
    Profile.findOneAndUpdate(
      { _id: req.params.profileId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((profile) =>
        !profile
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json({ message: "a friend has been added" })
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteProfileFriend(req, res) {
    Profile.findOneAndUpdate(
      { _id: req.params.profileId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((profile) =>
        !profile
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json({ message: "This friend has been deleted." })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = profileController;