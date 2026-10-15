const mongoose = require("mongoose")
// eving with compromised database the usercred are not exposed
const bcrypt = require("bcryptjs")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [ true, "Email is required for creating a user" ],
        trim: true,
        lowercase: true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email address" ],
        unique: [ true, "Email already exists." ]
    },
    name: {
        type: String,
        required: [ true, "Name is required for creating an account" ]
    },
    password: {
        type: String,
        required: [ true, "Password is required for creating an account" ],
        minlength: [ 6, "password should contain more than 6 character" ],
        select: false
    },
    systemUser: {
        type: Boolean,
        default: false,
        immutable: true,
        select: false
    }
}, {
    timestamps: true
})

// this function runs before savign the user
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return
    }
// hashing the password before saving it to the database , 10 means the number of rounds of hashing to be done
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash

    return

})

userSchema.methods.comparePassword = async function (password) {

    console.log(password, this.password)

    return await bcrypt.compare(password, this.password)

}


const userModel = mongoose.model("user", userSchema)

module.exports = userModel