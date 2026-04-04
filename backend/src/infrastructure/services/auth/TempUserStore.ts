import { ITempUserStore, TempUserData } from "../../../application/interfaces/services/ITempUserStore";
import Redis from "ioredis";
import { logError } from "../log/logger";

export class TempUserStore implements ITempUserStore {
    constructor(private readonly redis: Redis) { }

    private getKey(identifier: string) {
        return `register:${identifier}`;
    }

    async save(identifier: string, data: TempUserData, ttlSeconds: number): Promise<void> {
        try {
            await this.redis.set(
                this.getKey(identifier),
                JSON.stringify(data),
                "EX",
                ttlSeconds
            );
        } catch (error) {
            logError(error, "TempUserStore save failed");
            throw error;
        }
    }

    async get(identifier: string): Promise<TempUserData | null> {
        const data = await this.redis.get(this.getKey(identifier));
        return data ? JSON.parse(data) : null;
    }

    async delete(identifier: string): Promise<void> {
        await this.redis.del(this.getKey(identifier));
    }
}