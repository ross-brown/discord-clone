import { currentUser, redirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

/**
 * Retrieves the user's profile.
 * First checks if there is a current user, if not, redirect to sign-in.
 * If there is a user, it queries the DB for their profile and returns if found
 * Otherwise, it creates a new profile in the DB and returns that.
 */

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) return redirectToSignIn();

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  if (profile) return profile;

  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};
