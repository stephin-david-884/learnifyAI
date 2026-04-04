import bcrypt from "bcrypt";
import { IHashService } from "../../../application/interfaces/services/IHashService";
import { logError } from "../log/logger";

// export const hashPassword = async (password: string) => {
//   return bcrypt.hash(password, 10);
// };

// export const comparePassword = async (
//   password: string,
//   hashed: string
// ) => {
//   return bcrypt.compare(password, hashed);
// };

export class HashService implements IHashService {

  constructor(private readonly saltRounds: number = 10) {}

  async hash(value: string): Promise<string> {
    try {
      return await bcrypt.hash(value, this.saltRounds);
    } catch (error) {
      logError(error, "Failed to hash")
      throw error     
    }
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    try {
      return await bcrypt.compare(value, hashed);
    } catch (error) {
      logError(error, "Failed to compare")
      throw error
    }
  }
}