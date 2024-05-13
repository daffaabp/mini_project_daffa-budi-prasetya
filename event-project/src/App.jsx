import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/PrivatePages/Dashboard";
import AddEventPage from "./pages/PrivatePages/AddEventPage";
import ChatAiPage from "./pages/PrivatePages/ChatAiPage";
import ListEventPage from "./pages/PrivatePages/ListEventPage";
import LikeEventPage from "./pages/PrivatePages/LikeEventPage";
import LoginPageFix from "./pages/PublicPages/LoginPageFix"; // Import LoginPageFix

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/login" element={<LoginPageFix />} />

        {/* Private Pages */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/add-event" element={<AddEventPage />} />
                <Route path="/list-events" element={<ListEventPage />} />
                <Route path="/like-events" element={<LikeEventPage />} />
                <Route path="/chat-cs" element={<ChatAiPage />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
