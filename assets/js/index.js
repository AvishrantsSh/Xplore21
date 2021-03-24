const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const currWin = remote.getCurrentWindow()
const axios = require('axios')

// Control Buttons
const closeBtn = document.getElementById('closeBtn')
const minBtn = document.getElementById('minBtn')
const resBtn = document.getElementById('resBtn')


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

function init() {
    if (currWin.isMaximized())
        maxmin.className = 'far fa-square'
    else
        maxmin.className = "far fa-clone";

    // axios.post('http://localhost:8000/api/', {
    //     stoken: "OP",
    //     file: "gg",
    // }).then(res => {
    //     console.log(`statusCode: ${res.statusCode}`)
    //     console.log(res)
    // }).catch(error => {
    //     console.error(error)
    // })
}

window.onload = init
console.log('Script is Working Fine')