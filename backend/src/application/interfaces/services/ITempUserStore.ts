export interface TempUserData {
  name: string;
  email: string;
  password: string;
}

export interface ITempUserStore {
  save(identifier: string, data: TempUserData, ttlSeconds: number): Promise<void>;
  get(identifier: string): Promise<TempUserData | null>;
  delete(identifier: string): Promise<void>;
}