import { BaseDatabase } from "./BaseDatabase";
import { RecipeDatabase } from "./RecipeDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Cookenu_User";

  public async createUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id: id,
        name: name,
        email: email,
        password: password,
        role: role,
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }

  public async deleteUser(id: string): Promise<any> {
    await this.getConnection()
      .delete("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
  }
}
