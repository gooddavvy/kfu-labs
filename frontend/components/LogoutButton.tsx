import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="
        flex justify-center
        px-6 py-2.5
        ml-5
        bg-gradient-to-br from-pink-500 to-red-500
        text-white
        rounded-lg
        font-bold
        shadow-md
        transition-transform transition-colors
        hover:scale-105
        hover:from-red-500 hover:to-pink-500
      "
    >
      Logout
    </button>
  );
}
