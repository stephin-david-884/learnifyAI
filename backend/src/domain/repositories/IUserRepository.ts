import { NewUser, User } from "../entities/User.entity";

export interface IUserRepository {
    findByEmail(email: string): Promise<User | null>;
    create(user: NewUser): Promise<User>;
}
