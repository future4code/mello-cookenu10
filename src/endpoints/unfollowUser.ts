import { Request, Response } from "express";
import { FollowersDatabase } from "../data/FollowersDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userToUnfollowId = req.body.userToUnfollowId as string;

    if (!userToUnfollowId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token);

    const followersDatabase = new FollowersDatabase();
    await followersDatabase.unfollowUser(
      authenticatorData.id,
      userToUnfollowId
    );

    res.status(200).send({
      message: "Deixou de seguir usuário",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
