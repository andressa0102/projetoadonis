import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Carro from 'App/Models/Carro'
import CarroValidator from 'App/Validators/CarroValidator'

export default class CarrosController { 

    public async index({ }: HttpContextContract) {
        const topic = await Carro.all()
        return topic
    }

    public async store({ request, auth }: HttpContextContract) {
        const data = await request.validate(CarroValidator)
        const topic = await Carro.create({ ...data})
        return topic
    }

    public async show({ params, response }: HttpContextContract) {
        try {
            const topic = await Carro.findOrFail(params.id)
            return topic
        }   catch (error) {
            response.status(400).send("Carro não encontrado!!!")
        }
    }

    public async update({ request, params, response }: HttpContextContract) {
        const { ano, nome, valor } = await request.validate(CarroValidator)
        try {
            const topic = await Carro.findOrFail(params.id)
            topic.ano = ano
            topic.nome = nome
            topic.valor = valor
            await topic.save()
            return topic

        } catch (error) {
            response.status(400).send("Carros não encontrado!!!")
        }
}

public async destroy({ params, response }: HttpContextContract) {
    try {
        const topic = await Carro.findOrFail(params.id)
        await topic.delete()
        return topic
    } catch (error) {
        response.status(400).send("Carros não encontrado!!!")
    }
}
}