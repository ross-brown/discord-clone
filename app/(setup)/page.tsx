import { initialProfile } from "@/lib/initial-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

/** SetupPage Component
 *
 * the initial setup page where a user's profile is retrieved,
 * checks if the user is already a member of any server.
 * If a server is found,the user is redirected to that server's page.
 * Otherwise, a message to create a new server is displayed.
 */
async function SetupPage() {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  });

  if (server) return redirect(`/servers/${server.id}`);

  return (
    <div>
      Create a server
    </div>
  );
}

export default SetupPage;
