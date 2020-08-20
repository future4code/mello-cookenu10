import { Request, Response } from "express";
import { FollowersDatabase } from "../data/FollowersDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const followUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userToFollowId = req.body.userToFollowId as string;

    if (!userToFollowId) {
      throw new Error("Todos os campos são obrigatórios");
    }

    const authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token);

    const followersDatabase = new FollowersDatabase();
    await followersDatabase.followUser(userToFollowId, authenticatorData.id);

    res.status(200).send({
      message: "Usuário seguido",
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
