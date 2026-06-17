import { UpdateProfileDTO } from "../../dtos/profile/update-profile.dto";

export const mapUpdateProfileRequest = (userId: string, body: Record<string, unknown>): UpdateProfileDTO => {

    return {
        userId,
        name: String(body.name ?? ""),
    }
}