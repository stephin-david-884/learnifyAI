import { User } from "../../../domain/entities/User.entity";
import { UserLean } from "../models/User";

export const toDomainUser = (dbUser: UserLean): User => {
  return new User(
    dbUser._id.toString(),
    dbUser.name,
    dbUser.email,
    dbUser.password ?? undefined,
    dbUser.googleId ?? undefined,
    dbUser.subscriptionPlan ?? "FREE",
    dbUser.credits ?? 20,
    dbUser.isBlocked ?? false,
    dbUser.subscriptionExpiresAt ?? undefined,
    dbUser.profileImage ?? undefined,
    dbUser.refreshToken ?? []
  );
};

export const toPersistenceUser = (user: User) => {
  return {
    name: user.name,
    email: user.email,
    password: user.getPassword(),
    profileImage: user.profileImage ?? null,
    googleId: user.googleId ?? null,
    refreshToken: user.getRefreshTokens() ?? [],
    subscriptionPlan: user.subscriptionPlan,
    credits: user.credits,
    subscriptionExpiresAt: user.subscriptionExpiresAt ?? null,
    isBlocked: user.isBlocked,
  };
};