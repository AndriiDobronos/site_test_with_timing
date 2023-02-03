"use strict";

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
const startTime = new Date()
document.querySelector("body").style.background = "olive"
document.querySelector(".check").style.display = "none"
document.querySelector("ul").style.display = "none"

document.querySelector(".checks").addEventListener('click',function (){
    document.querySelector(".singUp").style.display = "block",
        document.querySelector(".checks").style.display = "none"


})
const div = document.querySelector('.singUp')
div.style.display = "none"
div.innerHTML = '<div><form action="#">\n' +
    '  <fieldset>\n' +
    '    <legend>Disabled fieldset</legend>\n' +
    '    <div>\n' +
    '      <label for="name">Name: </label>\n' +
    '      <input type="text" id="name" value="Chris">\n' +
    '    </div>\n' +
    '    <div>\n' +
    '      <label for="name">Surename: </label>\n' +
    '      <input type="text" id="name" value="Ria">\n' +
    '    </div>\n' +
    '    <div>\n' +
    '      <label for="pwd">Password: </label>\n' +
    '      <input type="password" id="pwd" value="Wookie">\n' +
    '    <div>\n' +
    '      <label for="pwd">Submit: </label>\n' +
    '      <input class="submit" type="checkbox" id="pwd" value="Wookie">\n' +
    '    </div>\n' +
    '    </div>\n' +
    '  </fieldset>\n' +
    '</form></div>'
const ul = document.querySelector('.questions')
document.querySelector(".submit").addEventListener('click',function (){
    div.style.display = "none"
    ul.style.display = "block"
    document.querySelector(".check").style.display = "block"
})

let allLi = ``
for (let j = 0 ; j < questions.length ; j++) {
    const li = []
    li[j] = `<li>${questions[j].caption}<br><input class="radio" type="radio" name="name${j}" id="Так"/>
 <label  for="Так">Так</label><br><input class="radio" type="radio" name="name${j}" id="Ні"/>
 <label  for="Ні">Ні</label></li>`
    allLi = allLi + `${li[j]}`
}
ul.innerHTML =  allLi

document.querySelector(".check").addEventListener('click',function (){
    ul.style.display = "none"
    const endTime = new Date()
    const executionTime = Math.round(((endTime.getTime() - startTime.getTime()) / 60000)*10)/10
    let result = 0
    for (let i = 0 ; i < questions.length ; i++) {
        if (document.querySelectorAll("input.radio")[i*2].checked === questions[i].correctAnswer ) {
            result++
        }
    }
    return alert(`Your result is : ${result} / ${questions.length} \n ${executionTime} minutes`)
} )




