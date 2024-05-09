import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./pages/loginPage";
// import Success from "./pages/successPage";
// import LoginPageFix from "./pages/LoginPageFix";
// import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/PrivatePages/Dashboard";
function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/success" element={<Success />} />
    //   </Routes>
    // </Router>

    // <Router>
    //   <Layout>
    //     <Routes>
    //       <Route path="/" element={<LoginPageFix />} />
    //       <Route path="/register" element={<RegisterPage />} />
    //       <Route path="/dashboard" element={<Dashboard />} />
    //     </Routes>
    //   </Layout>
    // </Router>

    <Router>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/list-event" element={<ListEventPage />} />
          <Route path="/like-event" element={<LikeEventPage />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
