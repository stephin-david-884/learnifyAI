export interface UpdateProfileDTO {
    userId: string;
    name: string;
}

export interface UpdateProfileResponseDTO {
    id: string;
    name: string;
    email: string;
}