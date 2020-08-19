import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticatorData = authenticator.getData(token);

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(authenticatorData.id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
