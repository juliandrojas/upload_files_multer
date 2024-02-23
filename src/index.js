const express = require('express');
const path = require('path');
const multer = require('multer');
//Initializations
const app = express();
//Settings
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//Middleware Multer
//How storage the images configuration
const storage = multer.diskStorage({
    //destination for save the image 
    destination: path.join(__dirname, 'public/uploads'),
    //Name of the image
    filename: (req, file, cb) => {
        cb(null, "Emprendimiento" + file.originalname + path.extname(file.originalname).toLowerCase()); //The original name of the image is used as a unique identifier for each uploaded file
    }
});
const upload = multer({
    //Storage images
    storage: storage,
    //Donde se subirán las imagenes
    dest: path.join(__dirname, 'public/uploads'),
    //Limite de peso de las imagenes (en bytes)
    //limits: {fileSize: 1000000}
    //Que tipos de imagenes pueden subir
    fileFilter: (req, file, cb) => {
        //Configuramos las extensiones soportadas
        const fileTypes = /jpeg|jpg|png|gif/;
        //Examinamos el nombre completo
        const mimetype = fileTypes.test(file.mimetype);
        //Examinamos la extensión para guardarla en minusculas
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname) {
            return cb(null, true);
        }
        cb("Error: El archivo debe ser una imagen válida")
    }
}).single('image');
app.use(upload);
//Routes
app.use(require('./routes/index.routes.js'));
//Access to the static files
app.use(express.static(path.join(__dirname, 'public')));
//Start the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});