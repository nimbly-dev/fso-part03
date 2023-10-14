const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const Note = require('./model/note.js')
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(requestLogger)
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Accessing root...Go to index.html!</h1>')
})

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
      response.json(notes)
    })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    Note.findById(request.params.id)
      .then(note => {
        response.json(note)
      })
      .catch(error=>{
        console.log(error)
        response.status(500).end()
      })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    Note.findByIdAndRemove(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
    
    response.status(204).end()
})
  
app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(express.static('dist'))
