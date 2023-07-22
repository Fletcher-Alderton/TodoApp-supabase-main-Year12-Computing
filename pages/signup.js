import { useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";

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
      const {} = await supabaseClient.auth.signUp({
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
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#F7FAFC" }}>
      <div style={{ maxWidth: "400px", width: "100%", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px", textAlign: "center" }}>Sign Up</h1>
        {error && (
          <div style={{ color: "red", marginBottom: "20px", textAlign: "center" }}>{error}</div>
        )}
        {isSubmitted ? (
          <h2 style={{ fontSize: "16px", textAlign: "center", color: "gray.600" }}>
            Please check {email} for the login link
          </h2>
        ) : (
          <form onSubmit={submitHandler}>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #D1D5DB" }}
              />
            </div>
            <div style={{ marginBottom: "20px" }}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #D1D5DB" }}
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
