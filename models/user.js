import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    userType: {
        type: String,
        required: true,
        default: "Prop",
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;