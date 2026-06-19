import { ChangePasswordDTO } from "../../dtos/profile/ChangePasswordDTO";

export const mapChangePasswordRequest = (
    userId: string,
    body: Record<string, unknown>
): ChangePasswordDTO => {

    return {
        userId,

        currentPassword: String(body.currentPassword ?? ""),

        newPassword: String(body.newPassword ?? ""),
    }
}