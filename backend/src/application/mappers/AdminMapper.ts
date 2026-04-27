import { Admin } from "../../domain/entities/Admin.entity";
import { AdminLean } from "../../infrastructure/database/models/Admin";

export const toDomainAdmin = (dbAdmin: AdminLean): Admin => {
    return new Admin({
        id: dbAdmin._id.toString(),
        name: dbAdmin.name,
        email: dbAdmin.email,
        password: dbAdmin.password,
        isSuperAdmin: dbAdmin.isSuperAdmin ?? false,
        isActive: dbAdmin.isActive ?? true,

        refreshTokens: dbAdmin.refreshTokens ?? [],
    });
};

export const toPersistenceAdmin = (admin: Admin) => {
    return {
        name: admin.name,
        email: admin.email,
        password: admin.getPassword(),
        isSuperAdmin: admin.isSuperAdmin ?? false,
        isActive: admin.isActive,
        refreshTokens: admin.getRefreshTokens(),
    };
};