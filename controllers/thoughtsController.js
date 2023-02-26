const { Thoughts, Profile } = require("../models");

const thoughtsController = {

  createThought(req, res) {
    Thoughts.create(req.body)
      .then((thoughts) => {
        return Profile.findOneAndUpdate(
          { _id: req.body.profileId },
          { $addToSet: { thoughts: thoughts._id } },
          { new: true }
        );
      })
      .then((profile) =>
        !profile
          ? res.status(404).json({
              message: "A thought has been created but there is no profile that matches the ID",
            })
          : res.json("What's on your mind?")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getThoughts(req, res) {
    Thoughts.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    Thoughts.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate({ path: "reactions", select: "-__v" })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid request" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateThoughtById(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid request" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
 
  deleteThoughtById(req, res) {
    Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json({ message: "This thought has been deleted." })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  addReaction(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "No thought with this ID!" })
          : res.json({ message: "A reaction has been added." })
      )
      .catch((err) => res.status(500).json(err));
  },

  deleteReactionById(req, res) {
    Thoughts.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId} } },
      { runValidators: true, new: true }
    )
      .then((reaction) =>
        !reaction
          ? res.status(404).json({ message: "Invalid Request" })
          : res.json({ message: "This reaction has been deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtsController;