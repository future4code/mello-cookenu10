import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
    };

    if (!userData.email || !userData.name || !userData.password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (userData.email.indexOf("@") === -1) {
      throw new Error("E-mail inválido");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(userData.password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(
      id,
      userData.name,
      userData.email,
      hashPassword,
      userData.role
    );

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id, role: userData.role });

    res.status(200).send({
      message: "Usuário criado com sucesso",
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
