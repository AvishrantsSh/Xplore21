const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const currWin = remote.getCurrentWindow()
const axios = require('axios')
const delay = ms => new Promise(res => setTimeout(res, ms));

// Control Buttons
const closeBtn = document.getElementById('closeBtn')
const minBtn = document.getElementById('minBtn')
const onlineBtn = document.getElementById('onlineBtn')
const offlineBtn = document.getElementById('offlineBtn')
const vidForm = document.getElementById('vid-form')
let online = false

// Event Listeners
closeBtn.addEventListener('click', function () {
    currWin.close()
})

minBtn.addEventListener('click', function () {
    currWin.minimize()
})

onlineBtn.addEventListener('click', () => {
    notify('Switched to Online Mode')
    document.getElementById('mode').textContent = 'Online'
    document.getElementById('addr').textContent = 'http://amazon.com'
    online = true
})

offlineBtn.addEventListener('click', () => {
    notify('Switched to Offline Mode')
    document.getElementById('mode').textContent = 'Offline'
    document.getElementById('addr').textContent = 'http://localhost:8000/'
    online = false
})

document.getElementById('vid').onchange = async => {
    sendFile()
}

vidForm.onsubmit = async (e) => {
    e.preventDefault();
    sendFile()
}
function notify(msg) {
    document.getElementById('snackbar').textContent = msg
    snack()
}


function sendFile() {
    var formData = new FormData();
    var vidFile = document.querySelector('#vid');
    formData.append("stoken", "test123")
    formData.append("vid", vidFile.files[0]);

    let url = ''
    if (online == true)
        url = 'http://localhost:8000/api/'
    else
        url = 'http://localhost:8000/api/'

    axios.post(url, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(res => {
        console.log(res.data.vidurl)
        ipc.send('notify', res.data.vidurl)
    }).catch(error => {
        console.error(error)
    })
}
console.log('Script is Working Fine')

particlesJS.load('particles-js', '../assets/particles.json', function () {
    console.log('callback - particles.js config loaded');
});