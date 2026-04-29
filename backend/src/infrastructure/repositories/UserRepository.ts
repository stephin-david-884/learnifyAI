import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User.entity";
import { UserLean, UserModel } from "../database/models/User";
import { BaseRepository } from "./BaseRepository";
import { toDomainUser, toPersistenceUser } from "../../application/mappers/UserMapper";

export class UserRepository
    extends BaseRepository<User, UserLean>
    implements IUserRepository {

    constructor() {
        super(
            UserModel,
            toDomainUser,
            toPersistenceUser
        );
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this._model.findOne({ email })
            .select("+password")
            .lean();

        if (!user) return null;

        return toDomainUser(user);
    }

    async findAllPaginated(page: number, limit: number, search?: string): Promise<{ users: User[]; total: number; }> {
        const skip = (page - 1) * limit;

        const filter = search
            ? {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { email: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        const [users, total] = await Promise.all([
            this._model
                .find(filter)
                .skip(skip)
                .limit(limit)
                .lean(),

            this._model.countDocuments(filter)
        ]);

        return {
            users: users.map(toDomainUser),
            total
        };
    }


    // async findByIdWithPassword(id: string): Promise<User | null> {
    //     const user = await UserModel.findById(id)
    //                         .select("+password")
    //                         .lean();
    //     if (!user) return null;
    //     return toDomainUser(user);
    // }


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
