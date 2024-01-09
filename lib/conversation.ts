import { db } from "@/lib/db";

/** Gets an existing conversation between two members or creates a new one is none exist in the DB*/
export async function getOrCreateConversation(memberOneId: string, memberTwoId: string) {
  let conversation = await findConversation(memberOneId, memberTwoId) || await findConversation(memberTwoId, memberOneId);

  if (!conversation) conversation = await createNewConversation(memberOneId, memberTwoId);

  return conversation;
}

/** Finds a conversation between two members based on their IDs in the DB */
async function findConversation(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.findFirst({
      where: {
        AND: [
          { memberOneId },
          { memberTwoId }
        ]
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    });
  } catch (error) {
    return null;
  }
}

/** Creates a new conversation between two members in DB */
async function createNewConversation(memberOneId: string, memberTwoId: string) {
  try {
    return await db.conversation.create({
      data: {
        memberOneId,
        memberTwoId
      },
      include: {
        memberOne: {
          include: {
            profile: true
          }
        },
        memberTwo: {
          include: {
            profile: true
          }
        }
      }
    });
  } catch (error) {
    return null;
  }
}
