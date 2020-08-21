import * as jwt from "jsonwebtoken";

export class Authenticator {
  private static getExpiresIn(): number {
    return Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
  }

  public generateToken(data: AuthenticationData): string {
    return jwt.sign(
      {
        id: data.id,
        role: data.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn: Authenticator.getExpiresIn(),
      }
    );
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: data.id,
      role: data.role,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role: string;
}
