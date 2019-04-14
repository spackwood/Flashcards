const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const flashcardSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    toggle: {
        type: Boolean,
        default: false
    }
});

module.exports = Item = mongoose.model("flashcard", flashcardSchema);