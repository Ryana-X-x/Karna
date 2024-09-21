const Charity = require('../models/charityModel')
const Organization = require('../models/organizationModel')
const User = require('../models/userModel')
const generateTokenAndSetCookie = require('../utils/generateToken.js')
const axios=require('axios')
const getRating = async (req, res) => {
    const message = req.body.message; // Get the paragraph from the request

    try {
        const response = await axios.post('http://localhost:5001/assign_priority', {
            message: message
        });

        // Send the response back to the original requester
        res.json(response.data);
    } catch (error) {
        console.error('Error sending data to Flask server:', error);
        res.status(500).send('Error processing the paragraph');
    }
};
module.exports={
    getRating
}