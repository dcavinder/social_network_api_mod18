const { Thought, Profile } = require("../models");

const thoughtsController = {

  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return Profile.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thought: thought._id } },
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
    Thought.find()
      .then((thought) => res.json(thought))
      .catch((err) => res.status(500).json(err));
  },

  getOneThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Invalid request" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  updateOneThought(req, res) {
    Thought.findOneAndUpdate(
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
 
  deleteOneThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
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
    Thought.findOneAndUpdate(
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

  deleteOneReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactId: req.params.reactId} } },
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