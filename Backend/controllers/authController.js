const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const Organization = require('../models/organizationModel')
const generateTokenAndSetCookie = require('../utils/generateToken.js')


const signupUser = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords dont match" })
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "username already exists" })
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            fullName,
            username,
            password: hashPassword,
        })
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    } catch (error) {
        console.log('error in user signup controller', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}



const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if (!isPasswordCorrect || !user) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        generateTokenAndSetCookie(user._id, res);
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })

    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logged out successfully" })
    } catch (error) {
        console.log("Error in logout controll;er ", error.message);
        res.status(500).json({ error: "Internal server error" })
    }
}



const signupOrg = async (req, res) => {
    try {
        const { name, username, owner, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "passwords dont match" })
        }

        const organization = await Organization.findOne({ username });

        if (organization) {
            return res.status(400).json({ error: "username already exists" })
        }

        //HASH PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt)


        const newOrganization = new Organization({
            name,
            owner,
            username,
            password: hashPassword,
        })
        if (newOrganization) {
            generateTokenAndSetCookie(newOrganization._id, res)
            await newOrganization.save();

            res.status(201).json({
                _id: newOrganization._id,
                name: newOrganization.name,
                owner: newOrganization.owner,
                username: newOrganization.username,
            })
        } else {
            res.status(400).json({ error: "invalid user data" })
        }
    } catch (error) {
        console.log('error in Org signup controller', error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

const loginOrg = async (req, res) => {
    try {
        const { username, password } = req.body;
        const organization = await Organization.findOne({ username })
        const isPasswordCorrect = await bcrypt.compare(password, organization?.password || "");

        if (!isPasswordCorrect || !organization) {
            return res.status(400).json({ error: "Invalid username or password" })
        }
        generateTokenAndSetCookie(organization._id, res);
        res.status(201).json({
            _id: organization._id,
            name: organization.name,
            username: organization.username,
            owner: organization.owner,
        })

    } catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}



module.exports = {
    signupUser,
    loginUser,
    logoutUser,
    signupOrg,
    loginOrg
}