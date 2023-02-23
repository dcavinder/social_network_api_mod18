const { Schema, Types } = require("mongoose");
const moment = require("moment");

const reactionsSchema = new Schema(
  {
    reactId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactBody: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtDate) =>
        moment(createdAtDate).format("MMM Do YY"),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionsSchema;