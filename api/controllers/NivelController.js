// controllers/NivelController.js
const Services = require('../services/Services')
const niveisServices = new Services('Niveis')

class NivelController {

    static async buscaNiveis(req,res){
        try {
            const todasAsNivel = await niveisServices.pegaTodosOsRegistros()
            return res.status(200).json(todasAsNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
        
    }

    static async buscaUmaNivel(req, res){
        const {id} = req.params
        try {
            const umaNivel = await database.Nivel.findOne({where: {id: Number(id)}})
            return res.status(200).json(umaNivel)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async criaNivel(req, res){
        const novaNivel = req.body
        try {
            const novaNivelCriada = await database.Nivel.create(novaNivel)
            return res.status(200).json(novaNivelCriada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async atualizaNivel(req, res){
        const novaInfo = req.body
        const {id} = req.params
        try {
            await database.Nivel.update(novaInfo, {where: {id: Number(id)}})
            const NivelAtualizada = await database.Nivel.findOne({where: {id: Number(id)}})
            return res.status(200).json(NivelAtualizada)
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }

    static async apagaNivel(req, res){
        const {id} = req.params
        try {
            await database.Nivel.destroy({where: {id: Number(id)}})
            return res.status(200).json({message:`id ${id} deletado`})
        } catch (error) {
            return res.status(500).json(error.message)
        }
    }
}

module.exports = NivelController