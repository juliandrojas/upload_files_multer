const { Router } = require('express');
const path = require('path');
const router = Router();

router.get('/',(req, res) => {
    res.render('index')
});
router.post('/upload', (req, res) => {
    //Objeto con las propiedades de la imagen
    console.log(req.file);
    res.send('Uploaded');
});
module.exports = router;