const express = require('express')
const app = express()
var bodyParser = require('body-parser');
const teams = require('./teams.json')
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/', (request, response) => {
    response.send('Lets see some teams!')
})

app.get('/teams', (request, response) => {
    response.send(teams)
})

app.get('/teams/:filter', (request, response) => {
    let specificTeam = teams.filter((team) => { 
        let filter = request.params.filter
        return team.id == filter || team.abbreviation === filter
    })
    response.send(specificTeam)
})

app.post('/team', bodyParser.json(), (request, response) => {
  const body = request.body || {}
  console.log({body})
  if (!body.id || !body.location || !body.mascot || !body.abbreviation || !body.conference || !body.division) {
        response.send('Be sure you have an id, location, mascot, abbreviation, conference, and division specified')
        
  }
    teams.push(body)
  

  response.send(body)
})



app.all('*', (request, response) => {
    response.send('Wrong input command')
})


app.listen(1337, () => {
    console.log('started up')
})