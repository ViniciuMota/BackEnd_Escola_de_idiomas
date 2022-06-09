// controllers/TurmaController.js

class TurmaController {

    static async buscaTurmas(req,res){
        try {
            const todasAsTurma = await database.Turma.findAll()
            return res.status(200).json(todasAsTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

    static async buscaUmaTurma(req, res){
        const {id} = req.params
        try {
            const umaTurma = await database.Turma.findOne({where: {id: Number(id)}})
            return res.status(200).json(umaTurma)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaTurma(req, res){
        const novaTurma = req.body
        try {
            const novaTurmaCriada = await database.Turma.create(novaTurma)
            return res.status(200).json(novaTurmaCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaTurma(req, res){
        const novaInfo = req.body
        const {id} = req.params
        try {
            await database.Turma.update(novaInfo, {where: {id: Number(id)}})
            const TurmaAtualizada = await database.Turma.findOne({where: {id: Number(id)}})
            return res.status(200).json(TurmaAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaTurma(req, res){
        const {id} = req.params
        try {
            await database.Turma.destroy({where: {id: Number(id)}})
            return res.status(200).json({message:`id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = TurmaController