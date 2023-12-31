import { useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";
import Link from "next/link";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function signInWithEmail() {
    try {
      const { user, error } = await supabaseClient.auth.signIn({
        email: email,
        password: password,
      });

      if (error) throw error;
      const userID = user?.id;
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function signUphandler() {
    router.push("/signup");
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#252525", // Tailwind CSS bg-gray-100
      }}
    >
      <div
        style={{
          maxWidth: "20rem",
          width: "100%",
          backgroundColor: "#4A4A4A", // Tailwind CSS bg-white
          padding: "2rem",
          borderRadius: "0.5rem",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind CSS shadow-lg
        }}
      >
        <h1
          style={{
            fontSize: "1.875rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textAlign: "center",
            color: "#FEFEFE",
          }}
        >
          Login In
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
          }}
        >
          <label
            htmlFor="email"
            style={{
              color: "#FEFEFE", // Tailwind CSS text-gray-700
            }}
          >
            Email
            <span
              style={{
                color: "#EF4444", // Tailwind CSS text-red-500
              }}
            >
              *
            </span>
          </label>
          <input
            type="text"
            id="email"
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              color: "#FEFEFE",
              backgroundColor: "#252525", // Tailwind CSS text-gray-700
              placeholderColor: "#4A4A4A", // Tailwind CSS placeholder-gray-400
              border: "none", // Tailwind CSS border-gray-300
              borderRadius: "0.375rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Tailwind CSS shadow-sm
              outline: "none",
              ringWidth: "2px", // Tailwind CSS focus:ring-2
              ringColor: "#3B82F6", // Tailwind CSS focus:ring-blue-500
              ringOffsetWidth: "0.125rem", // Tailwind CSS focus:ring-offset-2
              ringOffsetColor: "#DBEAFE", // Tailwind CSS focus:ring-offset-blue-200
            }}
            name="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <label
            htmlFor="password"
            style={{
              color: "#FEFEFE", // Tailwind CSS text-gray-700
            }}
          >
            Password
            <span
              style={{
                color: "#EF4444", // Tailwind CSS text-red-500
              }}
            >
              *
            </span>
          </label>
          <input
            type="password"
            id="password"
            style={{
              padding: "0.75rem 1rem",
              fontSize: "1rem",
              color: "#FEFEFE",
              backgroundColor: "#252525", // Tailwind CSS text-gray-700
              placeholderColor: "#4A4A4A", // Tailwind CSS placeholder-gray-400
              border: "none", // Tailwind CSS border-gray-300
              borderRadius: "0.375rem",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", // Tailwind CSS shadow-sm
              outline: "none",
              ringWidth: "2px", // Tailwind CSS focus:ring-2
              ringColor: "#3B82F6", // Tailwind CSS focus:ring-blue-500
              ringOffsetWidth: "0.125rem", // Tailwind CSS focus:ring-offset-2
              ringOffsetColor: "#DBEAFE", // Tailwind CSS focus:ring-offset-blue-200
            }}
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "2rem", // Add margin-top of 2rem
          }}
        >
          <button
            type="button"
            style={{
              flex: 1, // Make the buttons take up equal space
              margin: "0 0.5rem", // Add horizontal margin between buttons
              padding: "0.5rem 1rem",
              backgroundColor: "#3B82F6", // Tailwind CSS bg-blue-500
              color: "#FFFFFF", // Tailwind CSS text-white
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind CSS shadow-md
              outline: "none",
              ringWidth: "2px", // Tailwind CSS focus:ring-2
              ringColor: "#3B82F6", // Tailwind CSS focus:ring-blue-500
              ringOffsetWidth: "0.125rem", // Tailwind CSS focus:ring-offset-2
              ringOffsetColor: "#FFFFFF", // Tailwind CSS focus:ring-offset-transparent
              borderRadius: "0.375rem",
              transitionProperty: "background-color, color, box-shadow",
              transitionTimingFunction: "ease-in",
              transitionDuration: "200ms",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={signInWithEmail}
          >
            Login
          </button>
          <button
            type="button"
            style={{
              flex: 1, // Make the buttons take up equal space
              margin: "0 0.5rem", // Add horizontal margin between buttons
              padding: "0.5rem 1rem",
              backgroundColor: "#3B82F6", // Tailwind CSS bg-blue-500
              color: "#FFFFFF", // Tailwind CSS text-white
              fontSize: "1rem",
              fontWeight: "600",
              boxShadow:
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Tailwind CSS shadow-md
              outline: "none",
              ringWidth: "2px", // Tailwind CSS focus:ring-2
              ringColor: "#3B82F6", // Tailwind CSS focus:ring-blue-500
              ringOffsetWidth: "0.125rem", // Tailwind CSS focus:ring-offset-2
              ringOffsetColor: "#FFFFFF", // Tailwind CSS focus:ring-offset-transparent
              borderRadius: "0.375rem",
              transitionProperty: "background-color, color, box-shadow",
              transitionTimingFunction: "ease-in",
              transitionDuration: "200ms",
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={signUphandler}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
