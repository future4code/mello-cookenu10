import { Request, Response } from "express";
import moment from "moment";
import {RecipeDatabase} from "../data/RecipeDatabase";


    export default async function getRecipeById(req: Request, res: Response) {
      try {
          const recipe = await new RecipeDatabase().getRecipeById(req.params.id)
    
         if (!recipe) {
            res
                .status(404)
                .send({
                    message: "Receita não encontrada "
                });
           } 
          res
            .status(200)
            .send({
                message: "Sucesso!",
                recipe: {
                    
                    "title": recipe.title,
                    "description": recipe.description,
                    "creation_time": recipe.creation_time
                
                }
            });
         } catch (error) {
            res
            .status(400)
            .send({
                message: error.sqlMessage || error.message });
        }
    }