export interface BaseMailPayload {
  to: string;
  subject?: string;
}

export interface IMailService<TPayload extends BaseMailPayload = BaseMailPayload> {
  send(payload: TPayload): Promise<void>;
}