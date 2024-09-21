const mongoose = require('mongoose')
const Schema = mongoose.Schema; 
const charitySchema = new Schema({
    charityId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String // URL of the charity image or logo
    },
    message: {
        type: String // A message or description about the charity
    },
    amount: {
        type: Number, // The current amount donated or raised
        default: 0,  // Starts at 0
        min: 0       // Prevents negative donations
    },
    targetAmount: {
        type: Number, 
        required: true,
        min: 0       
    },
    organizationId: {
        type: Schema.Types.ObjectId,
        ref: 'Organization', // Reference to the Organization model
        required: true
    },
    verified:{
        type:Boolean,
        default:false
    },
    completed:{
        type:Boolean,
        default:false
    },
    priority:{
        type:Number,
        required:true,
        max:10
    }
},{timestamps:true});

module.exports = mongoose.model('Charity', charitySchema);