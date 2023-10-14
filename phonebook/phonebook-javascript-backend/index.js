const express = require('express')
require('dotenv').config()
const ApiResponse = require('./model/ApiResponse.js')
const Contact = require('./model/contact.js')
var morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :res[content-length] :response-time ms :body'));


app.get('/api/contacts/', (request, response,next) => {
    Contact.find({}).then(contacts => {
      response.json(contacts)
    })
})

app.get('/api/contacts/info', (request, response,next)=>{
  Contact.countDocuments({})
    .then(result=>{
      response.json(new ApiResponse(result))
    })
    .catch(error=>{
      console.log(error)
      response.status(500).end()
    })
})

app.get('/api/contacts/:id',(request,response,next)=>{

  Contact.findByIdAndRemove(request.params.id)
    .then(result => {
        if(!result){
          response.status(404).json(new ApiResponse("Contact not found"))
        }else{
          response.status(204).end()
        }
    })
    .catch(error => next(error))
})


app.post('/api/contacts', (request, response,next)=>{
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'fields must not be empty' 
    })
  }

  try {
    Contact.findOne({ name: body.name }).exec()
      .then(existingContact => {
        if (existingContact) {
          // An existing contact with the same name was found
          return response.status(400).json(new ApiResponse(`An existing contact with the name ${body.name} was found.`));
        } else {
          // Create and save the new contact
          const newContact = new Contact({ name: body.name });
          newContact.save()
            .then(savedContact => {
              response.json(savedContact);
            })
            .catch(saveErr => {
              console.error(saveErr);
              response.status(500).json(new ApiResponse("Error while saving the contact."));
            });
        }
      })
      .catch(error => next(error))
  } catch (err) {
    console.log(err);
  }
  
})


app.delete('/api/contacts/:id', (request,response,next)=>{
  const id = Number(request.params.id)

  if(id == null){ 
    return response.status(404).json({
      error: 'Id param must not be empty'
    })
  }

  Contact.findByIdAndRemove(request.params.id)
         .then(result => {
            if(!result){
              response.status(404).end()
            }else{
              response.status(204).json(new ApiResponse("Deleted")).end()
            }
          })
         .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(express.static('dist'))
app.use(errorHandler)