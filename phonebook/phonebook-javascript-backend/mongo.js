//For command-line db access only
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const nameParam = process.argv[3]
const numberParam = process.argv[4]

const url =`mongodb+srv://altheosaqui:${password}@cluster0.2wsjoug.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(nameParam == null || !numberParam == null){
    console.log('Printing the db table')

    Contact.find({}).then(result => {
        console.log("Phonebook: ")
        if(result.length == 0){
            console.log('Collection is empty')
        }else{
            result.forEach(contact => {
                console.log(contact.name + " " + contact.number)
            })
        }
        
        mongoose.connection.close()
    })

}

if(nameParam || numberParam){

    const contact = new Contact({
        name: nameParam,
        number: numberParam,
    })

    contact.save().then(result => {
        console.log(`added ${nameParam} number ${numberParam} to phonebook`)
        mongoose.connection.close()
    })

}

