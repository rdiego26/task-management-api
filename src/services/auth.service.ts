import { Role, User } from "../entities/User";
import jwt from "jsonwebtoken";

const JWT_KEY: string = process.env.SECRET_JWT || "default_Key";

export const generateAuthToken = (user: User): string => {
    return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_KEY, {
        expiresIn: "2h"
    });
};

export const verifyToken = (token: string): User => {
  try {
      const tokenData = jwt.verify(token, JWT_KEY);
      return tokenData as User;
  }   catch (err: any) {
      throw new Error("Unauthenticated");
  }
};
