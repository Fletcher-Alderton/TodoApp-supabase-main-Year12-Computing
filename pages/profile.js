import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/client";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");
  const [avatarurl, setAvatarurl] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);

  const user = supabaseClient.auth.user();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .then(({ data, error }) => {
          if (!error && data.length > 0) {
            const profileData = data[0];
            setUsername(profileData.username || "");
            setWebsite(profileData.website || "");
            setBio(profileData.bio || "");
            setAvatarurl(profileData.avatarurl || "");
          }
        });
    }
  }, [user]);

  const updateHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const body = { username, website, bio };
    const userId = user.id;
    const { error } = await supabaseClient.from("profiles").update(body).eq("id", userId);
    if (!error) {
      setUsername(body.username);
      setWebsite(body.website);
      setBio(body.bio);
    }
    setIsLoading(false);
  };

  function makeid(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const uploadHandler = async (event) => {
    setIsImageUploadLoading(true);
    const avatarFile = event.target.files[0];
    const fileName = makeid(10);

    try {
      await supabaseClient.storage.from("avatars").upload(fileName, avatarFile, {
        cacheControl: "3600",
        upsert: false,
      });

      const { publicURL } = await supabaseClient.storage.from("avatars").getPublicUrl(fileName);
      await supabaseClient.from("profiles").update({ avatarurl: publicURL }).eq("id", user.id);
      setAvatarurl(publicURL);
    } catch (error) {
      console.log("Error uploading avatar", error);
    }

    setIsImageUploadLoading(false);
  };

  const profileContainerStyle = {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#252525", // Use a light background color
  };

  const formContainerStyle = {
    maxWidth: "400px", // Limit the width of the form
    width: "100%",
    backgroundColor: "#4A4A4A",
    padding: "16px", // Increase padding for better spacing
    borderRadius: "4px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FEFEFE",
    marginBottom: "16px", // Increase margin for better spacing
    textAlign: "center",
  };

  const avatarStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "16px", // Increase margin for better spacing
  };

  const labelStyle = {
    display: "inline-block",
    color: "#FEFEFE",
    backgroundColor: "#3490dc", // Use a modern color for the button
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "16px", // Increase margin for better spacing
    textAlign: "center",
  };

  const inputStyle = {
    display: "none",
  };

  const inputFieldStyle = {
    width: "100%", // Set input width to 100% for better responsiveness
    padding: "8px", // Increase padding for better spacing
    fontSize: "14px",
    color: "#FEFEFE",
    backgroundColor: "#252525",
    borderRadius: "4px",
    outline: "none",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    marginBottom: "16px", // Increase margin for better spacing
  };

  const textareaStyle = {
    ...inputFieldStyle,
    resize: "vertical",
    backgroundColor: "#252525",
  };

  const buttonStyle = {
    width: "100%", // Set button width to 100% for better responsiveness
    padding: "12px",
    backgroundColor: "#3490dc", // Use the same color as the button background
    color: "#FEFEFE",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease-in",
    outline: "none",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div>
      <Navbar />
      <div style={profileContainerStyle}>
        <div style={formContainerStyle}>
          <h1 style={titleStyle}>{username ? username : "Profile"}</h1>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img
              style={avatarStyle}
              src={"https://qralazcbgbrzyohnjnxc.supabase.co/storage/v1/object/sign/avatars/MJXO3dMlRp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL01KWE8zZE1sUnAiLCJpYXQiOjE2OTAwMjUzNDgsImV4cCI6MTcyMTU2MTM0OH0.DcwtwpWyoaYeW1k4DTzhNiZJeJIBWR9DnbI_mXtY5UM&t=2023-07-22T11%3A29%3A08.864Z"
              } // Use a local default avatar image
            />
            <label style={labelStyle}>
              {isImageUploadLoading ? "Uploading..." : "Upload Profile Picture"}
              <input
                type="file"
                style={inputStyle}
                onChange={uploadHandler}
                multiple={false}
                disabled={isImageUploadLoading}
              />
            </label>
          </div>
          <form style={formStyle} onSubmit={updateHandler}>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="username" style={{ color: "#FEFEFE" }}>
                Username
              </label>
              <input
                type="text"
                id="username"
                style={inputFieldStyle}
                placeholder="Add your username here"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="website" style={{ color: "#FEFEFE" }}>
                Website URL
              </label>
              <input
                type="url"
                id="website"
                style={inputFieldStyle}
                placeholder="Add your website here"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <label htmlFor="bio" style={{ color: "#FEFEFE" }}>
                Bio
              </label>
              <textarea
                style={textareaStyle}
                placeholder="Add your bio here"
                value={bio}
                onChange={(event) => setBio(event.target.value)}
              />
            </div>
            <div style={{ marginBottom: "16px" }}>
              <button type="submit" style={buttonStyle} disabled={isLoading}>
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
