const express = require('express')
const ApiResponse = require('./model/ApiResponse.js')
const Contact = require('./model/Contact.js')
var morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status - :res[content-length] :response-time ms :body'));


let contacts = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/contacts/', (request, response) => {
    response.json(contacts)
})

app.get('/api/contacts/info', (request, response)=>{
    response.json(new ApiResponse(contacts.length))
})

app.get('/api/contacts/:id',(request,response)=>{
  const id = Number(request.params.id)
  const contact = contacts.find(contact => contact.id === id)

  if(contact){
    response.json(contact)
  }else{
    response.status(404).end()
  }

})

const generateId = () => {
  const maxId = contacts.length > 0
    ? Math.max(...contacts.map(n => n.id))
    : 0
  return maxId + 100
}

app.post('/api/contacts', (request, response)=>{
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'fields must not be empty' 
    })
  }

  const existingContactIndex = contacts.findIndex(contact => contact.name === body.name);

  if (existingContactIndex !== -1) {
    // Contact with the same name already exists, so update it
    contacts[existingContactIndex].number = body.number;
    return response.status(200).json(new ApiResponse(contacts[existingContactIndex]));
  }

  const contact = new Contact(generateId(),body.name,body.number);
  contacts = contacts.concat(contact);

  response.json(new ApiResponse(contact));
})


app.delete('/api/contacts/:id', (request,response)=>{
  const id = Number(request.params.id)

  if(id == null){
    return response.status(404).json({
      error: 'Id param must not be empty'
    })
  }

  contacts = contacts.filter(note=>note.id !== id)

  if(contacts){
    response.status(204).end()
  }else{
    response.status(404).json({
      error: 'Id does not exist'
    })
  }
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(express.static('dist'))