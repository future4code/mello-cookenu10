import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
  try {
    if (!req.body.email || req.body.email.indexOf("@") === -1) {
      throw new Error("Email inválido");
    }

    const userData = {
      email: req.body.email,
      password: req.body.password,
    };

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserByEmail(userData.email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      userData.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Usuário ou senha incorreto");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id, role: user.role });

    res.status(200).send({
      message: "Usuário logado",
      token,
    });
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
