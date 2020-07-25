//MONGODB HERE
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);;
//process argv is collection of commands entered when executing the program
let uniqueValidator = require('mongoose-unique-validator')
const url = process.env.MONGODB_URI
console.log('CONNECTING to ', url)
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(result => {
  console.log('connected to mongodb')
}).catch(err => {
  console.log('error occured while connecting to mongodb', err.message)
})
//SCHEMA IS basically defining structure of the object
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    minlength:3
  },
  number: {
    type: String,
    required: true,
    minlength:8
  }
})
personSchema.plugin(uniqueValidator)
//model is instance of the schema from what i understand
const Person = mongoose.model('Person', personSchema)
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
//exporting the model of person
module.exports = mongoose.model('Person', personSchema)
