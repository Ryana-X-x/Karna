const mongoose = require('mongoose')

const donationSchema = new Schema({
    donationId: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    donorUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    charityId: {
        type: Schema.Types.ObjectId,
        ref: 'Charity', // Reference to the Charity model
        required: true
    },
    
},{timestamps:true});

module.exports = mongoose.model('Donation', donationSchema);