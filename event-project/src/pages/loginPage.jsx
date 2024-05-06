import React from "react";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useNavigate } from "react-router-dom";

const supabase = createClient(
  "https://ybdxfeeyrsjflnktyotw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZHhmZWV5cnNqZmxua3R5b3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ5MDgzNTUsImV4cCI6MjAzMDQ4NDM1NX0.gHZehK69lzhnJn8w8pwZPj6WERmedwcdF9e5gHPMM_U"
);

function Login() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN") {
      // forward to success url
      navigate("/success");
    } else {
      // redirect to login
      navigate("/");
    }
  });
  return (
    <div className="bg-gray-300 min-h-screen flex items-center justify-center">
      <header className="w-full max-w-md p-4bg-white rounded-lg shadow-lg">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["discord", "facebook"]}
          className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg"
        />
      </header>
    </div>
  );
}

export default Login;
