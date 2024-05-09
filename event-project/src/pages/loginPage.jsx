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
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 min-h-screen flex items-center justify-center">
      <header className="w-full sm:max-w-md bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Login Event Project</h2>
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
