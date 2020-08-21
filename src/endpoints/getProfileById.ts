import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
// import { connection, Cookenu_User } from "../index";

// export default async function getProfileById(req: Request, res: Response) {
//     try {
//         const result = await connection.raw(`
//             SELECT id, id name email  FROM ${Cookenu_User}
//             WHERE id = "${req.params.id as string}"
//         `)

//         if (!result[0][0]) {
//             res
//                 .status(404)
//                 .send({
//                     message: "Usuário não encontrado"
//                 });
//         }

//         res
//             .status(200)
//             .send({
//                 message: "Sucesso!",
//                 user: result[0][0]
//             });
//     } catch (error) {
//         res
//             .status(400)
//             .send({
//                 message: error.sqlMessage || error.message
//             });
//     }
// }

export const getProfileById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userDatabase = new UserDatabase();
    const user = await userDatabase.getUserById(id);

    res.status(200).send({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
