import { Admin } from "../entities/Admin.entity";
import { IBaseRepository } from "./IBaseRepository";

export interface IAdminRepository extends IBaseRepository<Admin> {
    findByEmail(email: string): Promise<Admin | null>
}