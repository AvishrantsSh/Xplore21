const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const currWin = remote.getCurrentWindow()

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
}

window.onload = init
console.log('Script is Working Fine')