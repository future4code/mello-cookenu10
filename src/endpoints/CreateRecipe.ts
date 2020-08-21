import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator"
import {RecipeDatabase} from "../data/RecipeDatabase"

export default async function createRecipe(req: Request, res: Response) {
    try {
        const {title, description,creation_time } = req.body
        const idGenerator = new IdGenerator();
        const id = idGenerator.generateId();

        if (!title || !description || !creation_time ) {
            res
                .status(400)
                .send({
                    message: "Todos os campos sãop de preenchimento obrigatório"
                })
        }

        await new RecipeDatabase().createRepice(
            id,
            title,
            description,
            creation_time
        )

        res
            .status(200)
            .send({
                message: "Nova receita adicionada",
            });
    } catch (error) {
        res
            .status(400)
            .send({
                message: error.sqlMessage || error.message
            });
    }
}