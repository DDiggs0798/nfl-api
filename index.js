const express = require('express')
const app = express()
const teams = require('./teams.json')

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


app.all('*', (request, response) => {
    response.send('Wrong input command')
})


app.listen(1337, () => {
    console.log('started up')
})