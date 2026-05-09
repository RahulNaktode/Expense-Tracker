import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const postSignup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) {
        return res.json({
            success: false,
            message: "Name is required"
        })
    }

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required"
        })
    }

    if (!password) {
        return res.json({
            success: false,
            message: "Password is required"
        })
    }

    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.json({
            success: false,
            message: "User already exists with this email",
            data: null
        })
    }

    const newUser = new User({
        name,
        email,
        password: encryptedPassword
    });

    try {
        const savedUser = await newUser.save();

        return res.json({
            success: true,
            message: "User created successfully",
            data: savedUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: `Error created user: ${error.message}`,
            data: null
        })
    }
}

const postLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.json({
            success: false,
            message: "Email is required"
        })
    }

    if (!password) {
        return res.json({
            success: false,
            message: "Password is required"
        })
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
        return res.json({
            success: false,
            message: "User does not exist with this email",
            data: null
        })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

    existingUser.password = undefined;

    const jwtToken = jwt.sign({
        id: existingUser._id,
        email: existingUser.email
    },
        process.env.JWT_SECRET,
        {
            expiresIn: "1d"
        }
    );

    if (isPasswordCorrect) {
        return res.json({
            success: true,
            message: "User logged in successfully",
            data: existingUser,
            jwtToken: jwtToken
        });
    } else {
        return res.json({
            success: false,
            message: "Invalid password",
            data: null
        });
    }

}

const putUpdatedProfile = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const { name, email } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        return res.json({
            success: true,
            message: "User profile updated successfully",
            data: updatedUser
        })
    } catch (error) {
        return res.json({
            success: false,
            message: `Error updating user profile: ${error.message}`,
            data: null
        })
    }
}

const updatePassword = async (req, res) => {
    
        const { currentPassword, newPassword } = req.body;

        if(!currentPassword || !newPassword){
            return res.json({
                success: false,
                message: "password invalid"
            })
        }

        try{
            const user = await User.findById(req.user.id).select("password");

            if(!user){
                return res.json({
                    success: false,
                    message: "User not found"
                })
            }

            const matchPassword = await bcrypt.compare(currentPassword, user.password);

            if(!matchPassword){
                return res.json({
                    success: false,
                    message: "Current password is incorrect"
                })
            }

            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return res.json({
                success: true,
                message: "Password updated successfully"
            });
        }catch(error){
            return res.json({
                success: false,
                message: `Error updating password: ${error.message}`
            })
        }
}

export { postSignup, postLogin, putUpdatedProfile, updatePassword };