export type UserBlockAction = "BLOCK" | "UNBLOCK";

export interface BlockUserInputDTO {
  userId: string;
  action: UserBlockAction;
}

export interface BlockUserOutputDTO {
  userId: string;
  isBlocked: boolean;
}