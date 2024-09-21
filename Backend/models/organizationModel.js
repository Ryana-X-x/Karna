const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const organizationSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    description: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    // publicKey: {
    //     type: String,
    //     // required: true,
    //     unique: true
    // },
    verified: {
        type: Boolean,
        default: false
    },
    completed: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Organization', organizationSchema);
