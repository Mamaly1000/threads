import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full flex items-center justify-center min-h-screen" >
      <SignIn />
    </section>
  );
}
