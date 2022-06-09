const {Router} = require('express');
const NivelController = require('../controllers/NivelController')

const router = Router()

router.get('/Niveis', NivelController.buscaNiveis)
router.get('/Niveis/:id', NivelController.buscaUmaNivel)
router.post('/Niveis', NivelController.criaNivel)
router.put('/Niveis/:id', NivelController.atualizaNivel)
router.delete('/Niveis/:id', NivelController.apagaNivel)
module.exports = router