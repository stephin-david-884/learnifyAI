export interface IOtpStore {
    saveOtp(identifier: string, hashedOtp: string, ttlSeconds: number): Promise<void>;
    getOtp(identifier: string): Promise<string | null>;
    deleteOtp(identifier: string): Promise<void>
}