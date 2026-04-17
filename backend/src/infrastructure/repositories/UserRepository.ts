import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User.entity";
import { UserModel } from "../database/models/User";
import { AppError } from "../../domain/errors/AppError";
import { authMessages } from "../../application/constants/messages/authMessages";
import { statusCode } from "../../application/constants/enums/statusCode";
import { BaseRepository } from "./BaseRepository";
import { toDomainUser, toPersistenceUser } from "../../application/mappers/UserMapper";

export class UserRepository 
    extends BaseRepository<User, any> 
    implements IUserRepository {

    constructor() {
        super(
            UserModel,
            toDomainUser,
            toPersistenceUser
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await UserModel.findOne({ email })
            .select("+password")
            .lean();

        if (!user) return null;

        return toDomainUser(user);
    }


    async findById(id: string): Promise<User | null> {
        const user = await UserModel.findById(id)
                            .select("+password")
                            .lean();
        if (!user) return null;
        return toDomainUser(user);
    }


    // async delete(id: string): Promise<void> {
    //     const user = await UserModel.findByIdAndUpdate(
    //         id,
    //         {
    //             isDeleted: true,
    //             deletedAt: new Date(),
    //         },
    //         { new: true }
    //     );

    //     if (!user) {
    //         throw new AppError(
    //             authMessages.error.USER_NOT_FOUND,
    //             statusCode.NOT_FOUND
    //         );
    //     }
    // }
}
