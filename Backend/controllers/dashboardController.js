const User = require('../models/userModel')
const Organization = require('../models/organizationModel')
const Charity=require('../models/charityModel')
const getUserDashboard = async (req, res) => {
    try {
        const charity = await Charity.findall();
        const user = await User.findById(req.user._id);
        const organization = await Organization.findById(user.organizationId);
        res.status(200).json({
            charity,
            user,
            organization
        })
    } catch (error) {
        console.log('error in getUserDashboard controller', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

const getCharities = async (req, res) => {
    try {
        const charity = await Charity.findAll();
        res.status(200).json({
            charity
        })
    } catch (error) {
        console.log('error in getCharities controller', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

module.exports={
    getUserDashboard,
}