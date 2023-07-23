import { useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#252525",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
          background: "#4A4A4A",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "20px",
            textAlign: "center",
            color: "#FEFEFE",
          }}
        >
          Sign Up
        </h1>
        {error && (
          <div
            style={{
              color: "#EF4444",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        {isSubmitted ? (
          <h2
            style={{ fontSize: "16px", textAlign: "center", color: "#FEFEFE" }}
          >
            Please check {email} for the login link
          </h2>
        ) : (
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="email" style={{ color: "#FEFEFE" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "4px",
                  border: "none",
                  outline: "none",
                  color: "#FEFEFE",
                  backgroundColor: "#252525",
                }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="password" style={{ color: "#FEFEFE" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "none",
                  borderRadius: "4px",
                  outline: "none",
                  color: "#FEFEFE",
                  backgroundColor: "#252525",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "#3B82F6",
                color: "white",
                borderRadius: "4px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {isLoading ? "Signing up..." : "Sign up"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
