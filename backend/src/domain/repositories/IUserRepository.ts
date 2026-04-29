import { User } from "../entities/User.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IUserRepository extends IBaseRepository<User> {
    findByEmail(email: string): Promise<User | null>;
    findAllPaginated(page: number, limit: number, search?: string): Promise<{users: User[], total: number}>;
}
