export interface RegisterInputDTO {
    name: string;
    email: string;
    password:string;
}

export interface RegisterOutputDTO {
    success: boolean
    message: string;
}