import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const signup = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if (!name || !email || !password) {
      throw new Error("Todos os campos são obrigatórios");
    }

    if (email.indexOf("@") === -1) {
      throw new Error("E-mail inválido");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, hashPassword, "NORMAL");

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

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
