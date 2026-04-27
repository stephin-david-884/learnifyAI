export class Admin {
    public readonly id?: string;
    public email: string;
    private password: string;

    public name: string;
    public isActive: boolean;
    public isSuperAdmin: boolean;
    private refreshTokens: string[];

    constructor(props: AdminProps) {
        this.id = props.id;
        this.email = props.email;
        this.password = props.password;

        this.name = props.name;
        this.isActive = props.isActive ?? true;
        this.isSuperAdmin = props.isSuperAdmin ?? false;
        this.refreshTokens = props.refreshTokens ?? [];
    }

    getPassword() {
        return this.password;
    }

    setPassword(hashedPassword: string) {
        this.password = hashedPassword;
    }

    addRefreshToken(token: string) {
        this.refreshTokens.push(token);
    }

    removeRefreshToken(token: string) {
        this.refreshTokens = this.refreshTokens.filter(t => t !== token);
    }

    getRefreshTokens() {
        return [...this.refreshTokens];
    }

    getId(): string {
        if (!this.id) {
            throw new Error("Admin ID is not set");
        }
        return this.id;
    }

    deactivate() {
        this.isActive = false;
    }
}

type AdminProps = {
    id?: string;
    email: string;
    password: string;
    name: string;
    isActive?: boolean;
    isSuperAdmin?:boolean;
    refreshTokens?: string[];
};