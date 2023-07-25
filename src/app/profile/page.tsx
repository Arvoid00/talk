import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { ProfileForm } from "../../components/forms/ProfileForm";
import { getPrompts } from "../../actions/getPrompts";

type Prompts = {
  prompt_name: string;
  prompt_body: string;
}[];

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect(`/sign-in`);
  }

  const prompts = (await getPrompts(user)) as Prompts;

  return (
    <div className="flex-1 space-y-6">
      <div className="border-b bg-background px-4 py-6 md:px-6 md:py-8">
        <div className="mx-auto max-w-2xl md:px-6">
          <div className="space-y-1 md:-mx-8">
            <h1 className="text-2xl font-bold">
              {user.user_metadata.name}&apos;s Profile
            </h1>
            <div className="text-sm text-muted-foreground">
              {user.user_metadata.email}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 py-6 md:px-6">
        <div className="mx-auto max-w-2xl rounded-lg border bg-background p-6">
          <div className="space-y-6">
            <div className="space-y-6">
              <ProfileForm user={user} prompts={prompts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
