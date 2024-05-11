import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/PrivatePages/Dashboard";
import AddEventPage from "./pages/PrivatePages/AddEventPage";
import ChatAiPage from "./pages/PrivatePages/ChatAiPage";
import LoginPageFix from "./pages/PublicPages/LoginPageFix";
import ListEventPage from "./pages/PrivatePages/ListEventPage";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPageFix />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/list-event" element={<ListEventPage />} />
          {/* <Route path="/like-event" element={<LikeEventPage />} /> */}
          <Route path="/chat-cs" element={<ChatAiPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
