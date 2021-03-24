const electron = require('electron')
const path = require('path')
const remote = electron.remote
const ipc = electron.ipcRenderer
const currWin = remote.getCurrentWindow()
const delay = ms => new Promise(res => setTimeout(res, ms));

// Control Buttons
const closeBtn = document.getElementById('closeBtn')
const minBtn = document.getElementById('minBtn')
const resBtn = document.getElementById('resBtn')
const modeBtn = document.getElementById('modeSwitch')

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

function notify(msg) {
    document.getElementById('snackbar').textContent = msg
    snack()
}

function init() {
    if (currWin.isMaximized())
        maxmin.className = 'far fa-square'
    else
        maxmin.className = "far fa-clone";

    notifier()
}
async function notifier() {
    await delay(500)
    if (online == true)
        ipc.send('notify', 'http://localhost:8000/stream')
    
    else
        ipc.send('notify', 'http://localhost:8000/stream')
}

window.onload = init
console.log('Script is Working Fine')