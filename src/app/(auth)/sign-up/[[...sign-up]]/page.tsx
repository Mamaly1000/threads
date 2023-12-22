import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="w-full flex items-center justify-center min-h-screen">
      <SignUp />
    </section>
  );
}
