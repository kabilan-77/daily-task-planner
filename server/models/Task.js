const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
{
    title: String,

    description: String,

    dueDate: Date,

    priority: {
        type: String,
        default: "Medium"
    },

    status: {
        type: String,
        default: "Pending"
    },

    category: {
        type: String,
        default: "Personal"
    }

},
{ timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);