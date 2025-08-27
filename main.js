//console.log("processo principal")
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron')

//Janela principal
const createWindow = () => {
    nativeTheme.themeSource = 'system'
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/ludus-primal.png'
    })

    //menu personalido
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))

    win.loadFile('./src/views/index.html')
}

//janela sobre
const aboutWindow = () => {
    const about = new BrowserWindow({
        width: 360,
        height: 220,
        icon: './src/public/img/ludus-primal.png'
    })

    about.loadFile('./src/views/sobre.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit()
})

//template menu
const template = [
    {
        label: 'Arquivo',
        submenu: [
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
    },
    {
        label:'Exibir',
        submenu: [
            {
                label: 'Recarregar',
                role: 'reload',
            },
            {
                label:'Ferramentas do desenvolvedor',
                role:'toggleDevTools'
            },
            {
                type: 'separator'
            },
            {
                label:'Aplicar zoom',
                role:'zoomIn'
            },
            {
                label:'Reduzir zoom',
                role:'zoomOut'
            },
            {
                label:'Restaurar zoom',
                role:'resetZoom'
            }
        ]
    },
    {
        label:'Ajuda',
        submenu:[
            {
                label:'docs',
                click: () => shell.openExternal('https://www.electronjs.org/docs/latest')
            },
            {
                type: 'separator'
            },
            {
                label:'Sobre',
                click: () => aboutWindow()
            }
        ]
    }
]