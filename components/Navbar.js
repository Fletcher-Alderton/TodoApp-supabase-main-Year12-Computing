import NavLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { supabaseClient } from "../lib/client";

const Navbar = () => {
  const router = useRouter();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsLogoutLoading(true);
      await supabaseClient.auth.signOut();
      router.push("/signin");
    } catch (error) {
      router.push("/signin");
    } finally {
      setIsLogoutLoading(false);
    }
  };

  // Replace 'profileImageUrl' with the actual URL of the profile image or use a default image.
  const profileImageUrl =
    "https://qralazcbgbrzyohnjnxc.supabase.co/storage/v1/object/sign/avatars/MJXO3dMlRp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL01KWE8zZE1sUnAiLCJpYXQiOjE2OTAwMjUzNDgsImV4cCI6MTcyMTU2MTM0OH0.DcwtwpWyoaYeW1k4DTzhNiZJeJIBWR9DnbI_mXtY5UM&t=2023-07-22T11%3A29%3A08.864Z";

  return (
    <nav
      style={{
        height: "60px",
        padding: "0 20px",
        background: "#4A4A4A",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "#FEFEFE",
        boxShadow: "0 0 5px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>
        <NavLink href="/">
          <a
            style={{
              fontSize: "24px",
              color: "#FEFEFE",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            TodoApp
          </a>
        </NavLink>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <NavLink href="/profile">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
            }}
          >
            <img
              src={profileImageUrl}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
