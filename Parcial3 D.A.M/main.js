const { app, BrowserWindow } = require('electron');

let mainWindow;

function createWindow() {
    //crea la ventana principal
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            nodeIntegration: true //habilita node.js en la ventada de renderizacion
        }
    });

    //carga el archivo html de tu aplicacion
    mainWindow.loadFile('app/index.html');

    //maneja el evento de cierre de la ventana
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

//cuando la aplicacion este lista, crea la ventana principal
app.whenReady().then(createWindow);

//cierra la aplicacion cuando todas lass ventanas esten cerradas
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        app.quit();
    }
});

//crea una nueva ventana cuando la aplicacion se active
app.on('activate', () => {
if (mainWindow === null) {
    createWindow();
}
});