import { User } from "../../domain/entities/User.entity";
import { UserLean } from "../../infrastructure/database/models/User";



export const toDomainUser = (dbUser: UserLean): User => {
  return new User({
    id: dbUser._id.toString(),
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password ?? undefined,
    googleId: dbUser.googleId ?? undefined,

    subscriptionPlan: dbUser.subscriptionPlan ?? "FREE",
    credits: dbUser.credits ?? 20,
    isBlocked: dbUser.isBlocked ?? false,
    subscriptionExpiresAt: dbUser.subscriptionExpiresAt ?? undefined,

    profileImage: dbUser.profileImage ?? undefined,
    refreshTokens: dbUser.refreshTokens ?? []
  });
};

export const toPersistenceUser = (user: User) => {
  return {
    name: user.name,
    email: user.email,
    password: user.getPassword(),
    profileImage: user.profileImage ?? null,
    googleId: user.googleId ?? null,
    refreshTokens: user.getRefreshTokens() ?? [],
    subscriptionPlan: user.subscriptionPlan,
    credits: user.credits,
    subscriptionExpiresAt: user.subscriptionExpiresAt ?? null,
    isBlocked: user.isBlocked,
  };
};