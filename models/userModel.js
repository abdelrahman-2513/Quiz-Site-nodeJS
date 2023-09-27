const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "The user Email is required!"]
    },
    name: {
        type: String,
        required: [true, "The user's name is required!"]
    },
    password: {
        type: String,
        required: [true, "The user's password is required!"],
        minlength: 8,
        select: false
    },
    confirmPassword: {
        type: String,
        required: [true, "The user's password is required!"],
        validate: {
            validator: function (val) { return val === this.password },
            message: 'The confirm password not matches password'
        }
    }
    ,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    photo: {
        type: String
    },
    avgGrade: {
        type: Number,
        default: 0
    },
    totalGrade: {
        type: Number,
        default: 0
    },
    Quizzes: {
        type: Number,
        default: 0
    }
}, {
    toJSON: { virtuals: true },
    toObject: {
        virtuals: true
    },

})

//hashing password before saving to db

userSchema.pre('save', async function (next) {
    //check if the password not edited
    if (!this.isModified('password')) return next();

    //Hashing the password 
    this.password = await bcrypt.hash(this.password, 12)

    //Display password from the database
    this.confirmPassword = undefined;
    next();
})

userSchema.methods.correctPassword = async (candidatePassword, userPassword) => {
    return await bcrypt.compare(candidatePassword, userPassword);
}
// userSchema.pre('validate', async function (next) {
//     if (!this.password === this.confirmPassword)
//         return res.status(401).json({
//             status: 'Failed',
//             Message: 'not matched'
//         });
//     next();
// })
userSchema.methods.createResetPasswordToken = function () {
    //1)  Create the token  
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2) save the reset password token with hash  algorithm  in the data base and the expirse  date  
    this.resetPassToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    console.log(resetToken + "  //  " + this.resetPassToken);
    this.resetTokenExpires = Date.now() + 10 * 60 * 1000;

    //3)  return the reset token to be sent to  the email and checked
    return resetToken;
}
userSchema.virtual('answers', {
    ref: 'UserQuiz',
    foreignField: 'user',
    localField: '_id',
})

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })// in the real it will be {{{this.find({active:true})}}}}
    next();
})
const User = new mongoose.model('User', userSchema);

module.exports = User;