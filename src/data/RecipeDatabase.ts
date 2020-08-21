import { BaseDatabase } from "./BaseDatabase";
import moment from "moment";

export class RecipeDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Cookenu_Recipe";

  public async createRepice(
    id: string,
    title: string,
    description: string,
    creationDate: string
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        title,
        description,
        creation_date: creationDate,
      })
      .into(RecipeDatabase.TABLE_NAME);
  }

  public async getRecipeById(id: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id });
    return result[0];
  }

  public async deleteRecipe(id: string): Promise<any> {
    await this.getConnection()
      .delete("*")
      .from(RecipeDatabase.TABLE_NAME)
      .where({ id });
  }
}
