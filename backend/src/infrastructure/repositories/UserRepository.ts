import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { NewUser, User } from "../../domain/entities/User.entity";
import { UserModel } from "../database/models/User";
import { toDomainUser, toPersistenceUser } from "../database/mappers/UserMapper";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({email})
                                    .select("+password")    
                                    .lean();
        
        if(!user) return null;

        return toDomainUser(user);
    }

    async create(user: NewUser): Promise<User> {
        const created = await UserModel.create({
            ...user,
            subscriptionPlan: "FREE",
            credits:20,
            isBlocked: false,
            refreshToken: []
        });

        return toDomainUser(created.toObject())
    }
}