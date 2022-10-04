const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const isMac = process.platform === 'darwin' //returns true / false
const isDev = process.env.NODE_ENV !== 'development'

function createMainWindow() {
    const mainWindow = new BrowserWindow({
        title: 'Reseizer',
        width: isDev ? 1200 : 500,
        height: 600
    })

    if (isDev) {
        mainWindow.webContents.openDevTools() //open devTools if in dev env
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'))
}

app.whenReady().then(() => {
    createMainWindow()

    // implement menu
    const mainMenu = Menu.buildFromTemplate(menu)
    Menu.setApplicationMenu(mainMenu)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

// menu template
const menu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'Quit',
                click: () => app.quit(),
                accelerator: 'CmdOrCtrl+W' //shortcut
            }
        ]
    }
]

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})
