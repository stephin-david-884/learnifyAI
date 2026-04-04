import { User } from "../../../domain/entities/User.entity";
import { UserLean } from "../models/User";

export const toDomainUser = (dbUser: UserLean): User => {
  return {
    id: dbUser._id?.toString(),
    name: dbUser.name,
    email: dbUser.email,
    password: dbUser.password ?? undefined,

    profileImage: dbUser.profileImage ?? undefined,

    googleId: dbUser.googleId ?? undefined, 

    subscriptionPlan: dbUser.subscriptionPlan,
    credits: dbUser.credits,
    subscriptionExpiresAt: dbUser.subscriptionExpiresAt ?? undefined,

    isBlocked: dbUser.isBlocked,

    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt,
  };
};

export const toPersistenceUser = (user: User) => {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    profileImage: user.profileImage ?? null,
    googleId: user.googleId ?? null,
    subscriptionPlan: user.subscriptionPlan,
    credits: user.credits,
    subscriptionExpiresAt: user.subscriptionExpiresAt ?? null,
    isBlocked: user.isBlocked,
  };
};