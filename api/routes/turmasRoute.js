const {Router} = require('express');
const TurmaController = require('../controllers/TurmaController')

const router = Router()

router.get('/turmas', TurmaController.buscaTurmas)
router.get('/turmas/:id', TurmaController.buscaUmaTurma)
router.post('/turmas', TurmaController.criaTurma)
router.put('/turmas/:id', TurmaController.atualizaTurma)
router.delete('/turmas/:id', TurmaController.apagaTurma)
module.exports = router