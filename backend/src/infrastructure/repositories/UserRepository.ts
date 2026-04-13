import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User.entity";
import { UserModel } from "../database/models/User";
import { toDomainUser, toPersistenceUser } from "../database/mappers/UserMapper";
import { AppError } from "../../domain/errors/AppError";
import { authMessages } from "../../application/constants/messages/authMessages";
import { statusCode } from "../../application/constants/enums/statusCode";

export class UserRepository implements IUserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email })
            .select("+password")
            .lean();

        if (!user) return null;

        return toDomainUser(user);
    }

    async save(user: User): Promise<User> {
        const data = toPersistenceUser(user);

        let savedUser;

        if (user.id) {

            savedUser = await UserModel.findByIdAndUpdate(
                user.id,
                data,
                { new: true, runValidators: true }
            );
        } else {
            savedUser = await UserModel.create(data);
        }
        if (!savedUser) {
            throw new AppError(authMessages.error.USER_SAVE_FAILED, statusCode.BAD_REQUEST);
        }

        return toDomainUser(savedUser.toObject());
    }

    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id);
        if(!user) return null;
        return toDomainUser(user);
    }
}
