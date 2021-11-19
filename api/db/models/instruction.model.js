const mongoose = require('mongoose');

const InstructionSchema = ({
    text: {
        type: String
    },
    order: {
        type: Number
    }
})

const Instruction = mongoose.model('Instruction', InstructionSchema);

module.exports = { Instruction };