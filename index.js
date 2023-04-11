"use strict";
fetch('http://localhost:5556/questions').then(response => {
    console.log(response)
    return response.json()
})

    .then(question => {

        document.querySelector(".check").style.display = "none"
        document.querySelector(".questions").style.display = "none"
        document.querySelector(".send_result").style.display = "none"
        document.querySelector(".farewell").style.display = "none"
    document.querySelector(".checks").addEventListener('click',function (){
        document.querySelector(".singUp").style.display = "block"
        document.querySelector(".checks").style.display = "none"
        document.querySelector(".users").style.display = "none"
        document.querySelector(".get_results").style.display = "none"
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


    question.forEach(addQuestionToList)
    let numberOfAnswers = 0
    for (let l = 0 ; l < (question.length)*2 ; l++) {
        document.querySelectorAll(".radio")[l].onchange = function() {
            numberOfAnswers++
            if (numberOfAnswers === 4) {
                document.querySelector(".check").style.display = "block"
            }
        }
    }


    document.querySelector(".check").addEventListener('click',function (){
        ul.style.display = "none"
        document.querySelector(".check").style.display = "none"
        document.querySelector(".users").style.display = "none"
        document.querySelector(".send_result").style.display = "block"
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
            divShowGeo.innerHTML =`<h3>Your current location:<br>
          Latitude: <span class="latitude">${crd.latitude}</span><br>
          Longitude: <span class="longitude">${crd.longitude}</span><br>
          Exectness ${crd.accuracy} meters.</h3>`
        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`)
        }
        navigator.geolocation.getCurrentPosition(success, error, options)

        /**************************************************************/

        const divShow = document.querySelector('.showResult')
        let result = 0
        for (let i = 0 ; i < question.length ; i++) {
            if (document.querySelectorAll(".radio")[i*2].checked === question[i].correctAnswer ) {
                result++
            }
        }
        return divShow.innerHTML =`<p>Your result is : <span class="result">${result} / ${question.length}</span></p> 
        <h3> Execution time <span class="time">${executionTime}</span> minutes</h3>`

    })
})


fetch('http://localhost:5556/number').then(response => {
    console.log(response)
    return response.text()
})
    .then(number => {
        const h3 = document.createElement('h3')
        h3.style.width = "41vw"
        h3.textContent = `${number} participants`
        document.querySelector('.users').append(h3)
    })


let p = 0
function addQuestionToList(questions) {
    p++
    const li = document.createElement('li')
    li.textContent = questions.caption
    const label1 = document.createElement('label')
    label1.for = "Так"
    label1.textContent = "Так"
    const input1 = document.createElement('input')
    input1.className = 'radio'
    input1.type = "radio"
    input1.name = `${p}`
    input1.id = "Так"
    const input2 = document.createElement('input')
    input2.className = 'radio'
    input2.type = "radio"
    input2.name = `${p}`
    input2.id = "Hi"
    const label2 = document.createElement('label')
    label2.for = "Hi"
    label2.textContent = "Hi"
    document.querySelector('.questions').append(li)
    document.querySelector('.questions').append(label1)
    document.querySelector('.questions').append(input1)
    document.querySelector('.questions').append(label2)
    document.querySelector('.questions').append(input2)
}

fetch('http://localhost:5556/users').then(response => {
    return response.json()
})
    .then(user => {
        document.querySelector(".get_results").addEventListener('click', function () {
            document.querySelector('.window').style.display = "none"
            document.querySelector('.get_results').style.display = "none"
            const input = document.querySelector('input')
            input.className = 'password_input'
            input.value = 'Entered password: Andrii'
            document.querySelector('body').append(input)
            const btn = document.querySelector('button')
            btn.className = 'password_btn'
            btn.textContent = "Submit"
            document.querySelector('body').append(btn)
            btn.onclick = function() {
                if (input.value === "Andrii") {
                    document.querySelector('.password_btn').style.display = "none"
                    user.forEach(addUserToList)
                    document.querySelector('.window').style.display = "block"
                    document.querySelector('.password_input').style.display = "none"
                    document.querySelector('.add-users-form').style.display = "none"
                    document.querySelector('.checks').style.display = "none"
                    document.querySelector('.users').style.display = "block"
                }
            }
        })
    })

function addUserToList(user) {
    const h2 = document.createElement('h2')
    h2.style.width = "41vw"
    h2.textContent = `${user.id} ${user.name} ${user.lastName} :  result: ${user.result} execution time: ${user.time} minutes
    location:  Latitude: ${user.latitude}  Longitude: ${user.longitude}`
    document.querySelector('.users').append(h2)

}

document.querySelector('.send_result').addEventListener('click',async e => {
    document.querySelector('.window').style.display = 'none'
    document.querySelector('.farewell').style.display = 'block'
    const enteredName = document.querySelector('.add-users-form input[id="name1"]').value.trim()
    const enteredLastName = document.querySelector('.add-users-form input[id="name2"]').value.trim()
    const calculatedResult = document.querySelector('.result').textContent
    const executionTime = document.querySelector('.time').textContent
    const latitude = document.querySelector('.latitude').textContent
    const longitude =  document.querySelector('.longitude').textContent
    if(enteredName && isNaN(enteredName) && enteredLastName) {
        const newUser = {
            name: enteredName,
            lastName: enteredLastName,
            result: calculatedResult,
            time: executionTime ,
            latitude: latitude,
            longitude: longitude,
        }
        try {
            const response = await fetch('http://localhost:5556/user', {
                body:JSON.stringify(newUser),
                method:'POST',
                headers: {
                    contentType: 'application/json; charset=utf-8'
                }
            })
            const id = await response.text()
            newUser.id = id
            addUserToList(newUser)
            document.querySelector('.add-users-form input').value = ''
        }
        catch(err) {
            console.error(err)
        }
    }
})


/*
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
*/

/*
fetch('http://localhost:5556/users').then(response => {
    console.log(response)
    return response.json()
})
document.querySelector('button').addEventListener('click',async e => {
    const enteredName = document.querySelector('.add-users-form input').value.trim()
    if(enteredName && isNaN(enteredName)) {
        const newUser = {
            name: enteredName
        }
        try {
            const response = await fetch('http://localhost:5556/user', {
                body:JSON.stringify(newUser),
                method:'POST',
                headers: {
                    contentType: 'application/json; charset=utf-8'
                }
            })
            const id = await response.text()
            newUser.id = id
            addUserToList(newUser)
            document.querySelector('.add-users-form input').value = ''
        }
        catch(err) {
            console.error(err)
        }
    }
})
 */


/*
document.querySelector(".check").style.display = "none"
document.querySelector(".questions").style.display = "none"

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
*/
/*
let allLi = ``
for (let j = 0 ; j < questions.length ; j++) {
    allLi += `<li>${questions[j].caption}<br><input class="radio" type="radio" name="name${j}" id="Так"/>
 <label  for="Так">Так</label><br><input class="radio" type="radio" name="name${j}" id="Ні"/>
 <label  for="Ні">Ні</label></li>`
}
 document.querySelector('.questions').innerHTML =  allLi

let numberOfAnswers = 0
for (let l = 0 ; l < (questions.length)*2 ; l++) {
    document.querySelectorAll(".radio")[l].onchange = function() {
        numberOfAnswers++
        if (numberOfAnswers === 4) {
            document.querySelector(".check").style.display = "block"
        }
    }
}
*/
/*
document.querySelector(".check").addEventListener('click',function (){
    ul.style.display = "none"
    document.querySelector(".check").style.display = "none"
    const endTime = new Date()
    const executionTime = Math.round(((endTime.getTime() - startTime.getTime()) / 60000)*10)/10
*/
    /******************************************************************/
/*
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
          Exectness ${crd.accuracy} meters.</p>`
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`)
    }
    navigator.geolocation.getCurrentPosition(success, error, options)
*/
    /**************************************************************/
/*
    const divShow = document.querySelector('.showResult')
    let result = 0
    for (let i = 0 ; i < questions.length ; i++) {
        if (document.querySelectorAll("input.radio")[i*2].checked === questions[i].correctAnswer ) {
            result++
        }
    }
    return divShow.innerHTML =`<p>Your result is : ${result} / ${questions.length} <br> Execution time ${executionTime} minutes</p>`
})
 */
