const {PessoasServices} = require('../services')
const pessoasServices = new PessoasServices()

class PessoaController{
    static async buscaPessoasAtivas(req,res){
        try {
            const todasAsPessoasAtivas = await pessoasServices.pegaRegistrosAtivos()
            return res.status(200).json(todasAsPessoasAtivas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

    static async buscaPessoas(req,res){
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsPessoas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

    static async buscaUmaPessoa(req, res){
        const {id} = req.params
        try {
            const umaPessoa = await database.Pessoas.findOne({where: {id: Number(id)}})
            return res.status(200).json(umaPessoa)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try {
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(200).json(novaPessoaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const novaInfo = req.body
        const {id} = req.params
        try {
            await database.Pessoas.update(novaInfo, {where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id: Number(id)}})
            return res.status(200).json(pessoaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaPessoa(req, res){
        const {id} = req.params
        try {
            await database.Pessoas.destroy({where: {id: Number(id)}})
            return res.status(200).json({message:`id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async RestauraPessoa(req, res){
        const {id} = req.params
        try {
            await database.Pessoas.restore({where: {id: Number(id)}})
            return res.status(200).json({mensage: `id ${id} restaurado`})
        } catch (error) {
            return res.status(500).json(error.mensage)
        }
    }

    //Matriculas
    static async buscaUmaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params
        try {
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            })
            return res.status(200).json(umaMatricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res){
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try {
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(200).json(novaMatriculaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const novaInfo = req.body
        const {estudanteId, matriculaId} = req.params
        try {
            await database.Matriculas.update(novaInfo, {
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }})

            const MatriculaAtualizada = await database.Matriculas.findOne({
                where:{
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
            }})
            return res.status(200).json(MatriculaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params
        try {
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),  
                }})
            return res.status(200).json({message:`id ${matriculaId} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async PegaMatriculas(req, res){
        const {estudanteId, } = req.params
        try {
            const pessoa = await database.Pessoa.findOne({where: {id: Number(estudanteId)}})
            const matricula = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matricula)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async PegaMatriculasPorTurma(req, res){
        const { turmaId, } = req.params
        try {
            const todasAsMatriculas = await database.Matriculas
            .findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: ['estudante_id', 'DESC']
            })
            return res.status(200).json(todasAsMatriculas)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async PegaTurmasLotadas(req, res){
        const lotacaoTurma = 4
        try {
            const turmasLotadas = await database.Matriculas
            .findAndCountAll({
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async cancelaPessoa(req, res){
        const { estudanteId} = req.params
        try {
                await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId))
                return res.status(200).json({message:`Matriculas ref. estudante ${estudanteId} canceladas`})            
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController