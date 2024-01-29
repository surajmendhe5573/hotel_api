const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String,
        required: true
    },
    salary:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

personSchema.pre('save', async function(next){
    const person = this;

    if(!person.isModified('password')) return next();  // Hash the password only if it has been modified (or is new)

    try{
        const salt = await bcrypt.genSalt(10);      // hash password generation
        const hashedPassword = await bcrypt.hash(person.password, salt);  // hash password
        person.password = hashedPassword;   // Override the plain password with the hashed one
        next();
    }catch(err){
        return next(err);
    }
})

// personSchema.methods.comparePassword = async function(candidatePassword){
//     try{
//         // Use bcrypt to compare the provided password with the hashed password
//         const isMatch = await bcrypt.compare(candidatePassword, this.password);
//         return isMatch;
//     }catch(err){
//         throw err;
//     }
// }

// Create Person model
module.exports= new mongoose.model('Person', personSchema);
 