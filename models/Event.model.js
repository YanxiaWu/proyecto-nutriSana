const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
    {
        title: {
            type: String
        },
        type: {
            type: String,
            enum: ['indoor', 'outdoor'],
        },
        description:
        {
            type: String
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        }
    },

    {
        timestamps: true
    }
);

eventSchema.index({ location: '2dsphere' })


const Event = model("Event", eventSchema);

module.exports = Event;
