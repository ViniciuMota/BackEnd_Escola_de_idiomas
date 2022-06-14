const {Router} = require('express');
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.buscaPessoas)
router.get('/pessoas/ativas', PessoaController.buscaPessoasAtivas)
router.get('/pessoas/:id', PessoaController.buscaUmaPessoa)
router.post('/pessoas', PessoaController.criaPessoa)
router.put('/pessoas/:id', PessoaController.atualizaPessoa)
router.delete('/pessoas/:id', PessoaController.apagaPessoa)
router.post('/pessoas/:id/restaura', PessoaController.RestauraPessoa)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.PegaMatriculasPorTurma)
router.get('/pessoas/matricula/lotada', PessoaController.PegaTurmasLotadas)
router.get('/pessoas/:estudanteId/matricula', PessoaController.PegaMatriculas)
router.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.buscaUmaMatricula)
router.post('/pessoas/:estudanteId/matricula', PessoaController.criaMatricula)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaPessoa)
router.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
router.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)
module.exports = router