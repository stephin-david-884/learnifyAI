import { toDomainAdmin, toPersistenceAdmin } from "../../application/mappers/AdminMapper";
import { Admin } from "../../domain/entities/Admin.entity";
import { IAdminRepository } from "../../domain/repositories/IAdminRepository";
import { AdminLean, AdminModel } from "../database/models/Admin";
import { BaseRepository } from "./BaseRepository";

export class AdminRepository
    extends BaseRepository<Admin, AdminLean>
    implements IAdminRepository {

        constructor() {
            super(
                AdminModel,
                toDomainAdmin,
                toPersistenceAdmin
            );
        }

        async findByEmail(email: string): Promise<Admin | null> {

            const admin = await this._model.findOne({email}).select("+password").lean();

            if(!admin) return null;

            return toDomainAdmin(admin);
        }
    }