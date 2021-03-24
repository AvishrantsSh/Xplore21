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
const resBtn = document.getElementById('resBtn')
const modeBtn = document.getElementById('modeSwitch')
const vidForm = document.getElementById('vid-form')
let online = false

// Event Listeners
closeBtn.addEventListener('click', function () {
    currWin.close()
})

minBtn.addEventListener('click', function () {
    currWin.minimize()
})

resBtn.addEventListener('click', function () {
    if (currWin.isMaximized()) {
        currWin.unmaximize()
        maxmin.className = "far fa-clone";
    }
    else {
        if (currWin.maximizable) {
            currWin.maximize()
            maxmin.className = "far fa-square";
        }
    }
})

modeBtn.addEventListener('click', () => {
    console.log('Toggled!!')
    if (modeBtn.checked == true) {
        notify('Switched to Online Mode')
        online = true
    }
    else {
        online = false
        notify('Switched to Offline Mode')
    }
})

vidForm.onsubmit = async (e) => {
    e.preventDefault();
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
function notify(msg) {
    document.getElementById('snackbar').textContent = msg
    snack()
}

function init() {
    if (currWin.isMaximized())
        maxmin.className = 'far fa-square'
    else
        maxmin.className = "far fa-clone";
}

window.onload = init
console.log('Script is Working Fine')