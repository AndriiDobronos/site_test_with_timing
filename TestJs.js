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


document.querySelector(".check").style.display = "none"
document.querySelector("ul").style.display = "none"

document.querySelector(".checks").addEventListener('click',function (){
    document.querySelector(".singUp").style.display = "block",
        document.querySelector(".checks").style.display = "none"
})

const div = document.querySelector('.singUp')
div.style.display = "none"
let startTime = 0
const ul = document.querySelector('.questions')
document.querySelector(".submit").addEventListener('change',function (){
    div.style.display = "none"
    ul.style.display = "block"
    startTime = new Date()
})

let allLi = ``
for (let j = 0 ; j < questions.length ; j++) {
     allLi += `<li>${questions[j].caption}<br><input class="radio" type="radio" name="name${j}" id="Так"/>
 <label  for="Так">Так</label><br><input class="radio" type="radio" name="name${j}" id="Ні"/>
 <label  for="Ні">Ні</label></li>`
}
ul.innerHTML =  allLi

let numberOfAnswers = 0
for (let l = 0 ; l < (questions.length)*2 ; l++) {
    document.querySelectorAll("input.radio")[l].onchange = function() {
        numberOfAnswers++
        if (numberOfAnswers === 4) {
            document.querySelector(".check").style.display = "block"
        }
    }
}


document.querySelector(".check").addEventListener('click',function (){
    ul.style.display = "none"
    document.querySelector(".check").style.display = "none"
    const endTime = new Date()
    const executionTime = Math.round(((endTime.getTime() - startTime.getTime()) / 60000)*10)/10

/******************************************************************/
    const divShowGeo = document.querySelector('.showGeolocation')
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    }
    function success(pos) {
        const crd = pos.coords
        divShowGeo.innerHTML =`<p>Your current location:<br>
          Latitude: ${crd.latitude}<br>
          Longitude: ${crd.longitude}<br>
          Exectness ${crd.accuracy} meters.`
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
/**************************************************************/

    const divShow = document.querySelector('.showResult')
    let result = 0
    for (let i = 0 ; i < questions.length ; i++) {
        if (document.querySelectorAll("input.radio")[i*2].checked === questions[i].correctAnswer ) {
            result++
        }
    }
    return divShow.innerHTML =`<p>Your result is : ${result} / ${questions.length} <br> Execution time ${executionTime} minutes</p>`
} )






