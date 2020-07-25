require('dotenv').config()
const Person = require('./models/Person')
//Person is the person model use it like let person1= new Person{}
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.static('build'))
app.use(express.json())
app.use(cors())
/*let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
  ]*/
const check = (person) => {
  if (!person.name || !person.number) {
    return {
      msg: 'Error.The name/number is not added.'
    }
  }
  return {}
  //    let index = persons.find(el=>el.name===person.name);
  //    console.log(index);
  //    if(!index){
  //        return {}
  //    }else{
  //        return {msg:"name already exists in the server"}
  //    }

}

morgan.token('tiny', (request) => {
  console.log('inside morgan middleware')
  if (request.method === 'POST')
    return ' ' + JSON.stringify(request.body)
  else return ' '
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :tiny'))



app.get('/info', (request, response) => {
  Person.find({}).then(result => result.length).then(length => {
    response.send(`<p>Phone book has info for ${length} people.</p> <p>${new Date()}</p>`)
  })

})
app.get('/api/persons/', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = (request.params.id).toString()
  Person.find({
    '_id': id
  }).then(person => {
    if (person.length > 0) {
      response.send(person)
    } else {
      const err = new Error('THE RESOURCE YOU REQUESTED DOES NOT EXIST ON THE SERVER')
      err.status = 404
      next(err)
    }


  }).catch((err) => {
    err.status = 400
    err.message = 'malformatted id'
    next(err)
    /* console.log(err);
         response.status(400).send({
             err: 'malformatted id'
         });*/
  })
  //   if (person) {
  //    response.send(person)
  //  } else {
  //    response.status(404).end()
  //  }
})


app.delete('/api/persons/:id', (request, response) => {
  const id = (request.params.id).toString()
  Person.deleteOne({
    '_id': id
  })
    .then(response.status(204).end())

})

app.post('/api/persons/', (request, response, next) => {
  console.log('inside post function')
  const person = request.body
  const result = check(person)
  if (result.msg) {
    /* return response.status(409).json({
             error: result.msg
         })*/
    const err = new Error(result.msg)
    err.status = 409
    next(err)
  } else {
    const person1 = new Person({
      name: person.name,
      number: person.number,
    })
    person1.save().then(result => {
      response.json(result)
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      return result
    }).catch(err => next(err))
  }
})

app.put('/api/persons/:id', (request, response,next) => {
  console.log('inside put request')
  let person = request.body
  Person.update({
    '_id': request.body.id.toString()
  }, {
    $set: {
      'number': person.number,
    }
  },{ runValidators:true,context:'query' })
    .then(result => {
      console.log(result)
      response.json(person)
      return person
    })
    .catch(err => next(err))
    /*  for (let i = 0; i < persons.length; i++) {
          if (persons[i].id == oldperson.id) {
              persons[i] = person;
              break;
          }
      }*/

})


app.use((req, res, next) => {
  const err = new Error('Page not found')
  err.status = 404
  next(err)
})

//NEW ERROR HANDLER RIGHT HERE
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  })
  next()
})





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`PORT ${PORT}`)
})
