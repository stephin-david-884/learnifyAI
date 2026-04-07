export interface IOtpService {
    generate(): string;
    // compare(enteredOtp: string, hashedOtp: string): Promise<boolean>;
}