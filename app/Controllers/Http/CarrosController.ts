import type { HttpContextContract } from '@ioc:Adonis/core/HttpContext'
import Carro from 'App/Models/Carro'
import CarroValidator from 'App/Validators/CarroValidator'

export default class CarrosController {

    public async index({ }: HttpContextContract) {
        const topic = await Carros.query().preload('user').orderBy('id')
        return topic
    }

    public async store({ request, auth }: HttpContextContract) {
        const data = await request.validate(CarroValidator)
        const topic = await Carros.create({ ...data, userId: auth.user?.id })
        return topic
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const topic = await Carros.findOrFail(params.id)
            return topic
        }   catch (error) {
            response.status(400).send("Carro não encontrado!!!")
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        const { ano, Carros } = await request.validate(CarroValidator)
        try {
            const topic = await Carros.findOrFail(params.id)
            topic.ano = ano
            topic.Carros = Carros
            await Carros.save()
            return topic

        } catch (error) {
            response.status(400).send("Carros não encontrado!!!")
        }
}

public async destroy({ params, response }: HttpsContextContract) {
    try {
        const topic = await Carros.findOrFail(params.id)
        await topic.delete()
        return topic
    } catch (error) {
        response.status(400).send("Carros não encontrado!!!")
    }
}
}