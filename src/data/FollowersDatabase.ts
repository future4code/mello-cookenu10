import { BaseDatabase } from "./BaseDatabase";

export class FollowersDatabase extends BaseDatabase {
  private static TABLE_NAME: string = "Cookenu_Followers";

  public async followUser(user: string, follower: string): Promise<void> {
    await this.getConnection()
      .insert({
        user_id: user,
        follower_id: follower,
      })
      .into(FollowersDatabase.TABLE_NAME);
  }

  public async unfollowUser(user: string, follower: string): Promise<any> {
    const result = await this.getConnection().raw(`
      DELETE FROM ${FollowersDatabase.TABLE_NAME} WHERE user_id = ${user} AND follower_id = ${follower};
      `);
    return result[0];
  }
}
