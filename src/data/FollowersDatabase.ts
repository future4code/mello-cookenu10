import { BaseDatabase } from "./BaseDatabase";
import { followUser } from "../endpoints/followUser";

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
    const result = await this.getConnection()
      .del("*")
      .from(FollowersDatabase.TABLE_NAME)
      .where({ user_id: user })
      .andWhere({ follower_id: follower });
    return result[0];
  }
}
