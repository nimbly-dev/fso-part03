const express = require('express')
const ApiResponse = require('./model/ApiResponse.js')
const Contact = require('./model/Contact.js')


const app = express()
app.use(express.json())

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
  return maxId + 1
}

app.post('/api/contacts', (request, response)=>{
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  const contact = new Contact(generateId,body.name,body.number);

  contacts = contacts.concat(contact);

  response.json(new ApiResponse(contact));
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})