import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User";

dotenv.config();

const secret = process.env.JWT_SECRET || "Backup Secret";

export const getUserFromToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), secret) as { id: number };
    const user = await User.findByPk(decoded.id);
    return user;
  } catch (err) {
    return null;
  }
};

export interface Context {
  user: User | null;
}
