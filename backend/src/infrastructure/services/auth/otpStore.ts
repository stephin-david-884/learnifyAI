import { redisClient } from "../../config/redis.config";
import { IOtpStore } from "../../../application/interfaces/services/IOtpStore";

export class OtpStore implements IOtpStore {
  constructor(private readonly redis: typeof redisClient) {}

  private getKey(identifier: string): string {
    return `otp:${identifier}`;
  }

  async saveOtp(identifier: string, hashedOtp: string, ttlSeconds: number): Promise<void> {
    await this.redis.set(this.getKey(identifier), hashedOtp, "EX", ttlSeconds);
  }

  async getOtp(identifier: string): Promise<string | null> {
    return await this.redis.get(this.getKey(identifier));
  }

  async deleteOtp(identifier: string): Promise<void> {
    await this.redis.del(this.getKey(identifier));
  }
}