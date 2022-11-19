const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
        text: {
            type: String,
        },
        username: [
            {
                type: mongoose.Types.ObjectId,
                ref: "User",
            },
        ]
    },
    {
        timestamps: true,
    }
);

const Message = model("Message", messageSchema);

module.exports = Message;

// Username referenciando al modelo user?

