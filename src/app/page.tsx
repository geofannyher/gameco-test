import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { ArrowRightCircle } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Page() {
  const cookie = cookies().get("auth");
  if (!cookie) {
    redirect("auth/login");
  }
  const styleBtn =
    "hover:scale-95 transition duration-500 gap-2 w-1/5 hover:bg-slate-800 flex items-center justify-between text-sm font-medium";
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold text-center mb-8">Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">
          Welcome to your Dashboard
        </h2>

        <ul className="space-y-4">
          <li>
            <Link href="/form">
              <Button className={styleBtn}>
                Go to Form Page
                <ArrowRightCircle />
              </Button>
            </Link>
          </li>
          <li>
            <Link href="/pokemon">
              <Button className={styleBtn}>
                Go to Pokemon Page
                <ArrowRightCircle />
              </Button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex justify-center mt-6">
        <hr className="w-1/4 border-gray-300" />
      </div>

      {/* Logout Form */}
      <div className="mt-6 flex justify-center">
        <form action={logout}>
          <Button type="submit" size="default">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
