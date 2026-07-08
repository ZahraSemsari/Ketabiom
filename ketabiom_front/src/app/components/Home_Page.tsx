import HomePage_body1 from "./../components/HomePage_body1";
import HomePage_body1_login from "./../components/HomePage_body1_login";
import HomePage_body2 from "./../components/HomePage_body2";
import { useAuth } from "./AuthContext";

export default function Home_Page() {
  const { isLoggedIn } = useAuth();

  return (
    <div
      className="soft-animated-bg min-h-screen w-full overflow-x-hidden"
      dir="rtl"
    >
      {isLoggedIn ? <HomePage_body1_login /> : <HomePage_body1 />}

      <HomePage_body2 />
    </div>
  );
}
