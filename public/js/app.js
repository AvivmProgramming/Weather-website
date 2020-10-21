const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const forecastImg = document.querySelector('#forecastImg')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    forecastImg.src = ''

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            }
            else {

                messageOne.textContent = data.location
                forecastImg.src = data.forecastImgSrc
                messageTwo.textContent = data.forecast                

            }
        })
    })
})