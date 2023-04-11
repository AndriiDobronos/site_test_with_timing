"use strict";
import fastify from "fastify";

import cors from '@fastify/cors';

const server = fastify();
server.register(cors)

let lastId = 3;
const users = [{
    id: 1,
    name: 'Linda',
    lastName: "Rian",
    result: "4/4",
    time: "2.1"
},
    {
        id: 2,
        name: 'Adam',
        lastName: 'Rial',
        result: "3/4",
        time: "3.2"
    },
    {
        id: 3,
        name: 'Joe',
        lastName: 'Riak',
        result: "3/4",
        time: "2.8"
    }]


const questions = [{
    caption: 'Подія натискання на елемент називається click?',
    correctAnswer: true
},
    {
        caption: 'Усередині розмітки не можна додати обробник події?',
        correctAnswer: false
    },
    {
        caption: 'Припинити спливання події можна за допомогою метода stopImmediatePropagation?',
        correctAnswer: false
    },
    {
        caption: 'Припинити спливання події можна за допомогою метода stopPropagation?',
        correctAnswer: true
    }]

server.get('/',(request,reply) => {
    reply.send({name: "This is our server"})
})

server.get('/number',(request,reply) => {
    reply.send(lastId)
})

server.get('/questions',(request,reply) => {
    reply.send(questions)
})

server.get('/users',(request,reply) => {
    reply.send(users)
})

server.get('/results',(request,reply) =>{
    const result = users[0].result
    reply.send(result)
})


server.post('/user',(request,reply) => {
    const newUser = JSON.parse(request.body)
    if(typeof(newUser.name) !== "string" || !newUser.name.trim()) {
        reply.status(400).send({lastId ,error: 'Invalid user name'})
        return
    }
    newUser.id = ++lastId
    users.push(newUser)
    reply.send(lastId)
})

server.listen(5556)
    .then(() => {
        console.log("Successfully started")
    })
    .catch(err => {
        console.error(err)
    })


