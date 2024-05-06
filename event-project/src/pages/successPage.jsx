import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://ybdxfeeyrsjflnktyotw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZHhmZWV5cnNqZmxua3R5b3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MDgzNTUsImV4cCI6MjAzMDQ4NDM1NX0.gHZehK69lzhnJn8w8pwZPj6WERmedwcdF9e5gHPMM_U"
);
function Success() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserData() {
      await supabase.auth.getUser().then((value) => {
        // value.data.user
        if (value.data?.user) {
          console.log(value.data.user);
          setUser(value.data.user);
        }
      });
    }
    getUserData();
  }, []);

  async function signOutUser() {
    const { error } = await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(user) !== 0 ? (
          <>
            <h1>Success</h1>
            <button onClick={signOutUser}>Sign Out</button>
          </>
        ) : (
          <>
            <h1>User is not logged in</h1>
            <button onClick={() => navigate("/")}>Go back Home!</button>
          </>
        )}
      </header>
    </div>
  );
}

export default Success;
