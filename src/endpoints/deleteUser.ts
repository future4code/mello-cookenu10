import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { FollowersDatabase } from "../data/FollowersDatabase";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token);

    if (authenticatorData.role !== "admin") {
      throw new Error("Only a admin user can access this funcionality");
    }

    const id = req.params.id;

    const userDatabase = new UserDatabase();
    await userDatabase.deleteUser(id);

    const recipeDatabase = new RecipeDatabase();
    await recipeDatabase.deleteRecipe(id);

    const followersDatabase = new FollowersDatabase();
    await followersDatabase.deleteFollowersInfo(id);

    res.status(200).send({
      message: "Usuário deletado",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
