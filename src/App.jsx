import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashBoard from "./components/DashBoard.jsx";
import CreditsPieChart from "./components/CreditsPieChart.jsx";
import DepartmentSelect from "./components/DepartmentSelect.jsx";
import PreviewTable from "./components/PreviewTable.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Login from "./components/Login.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import Notifications from "./components/Notifications.jsx";

function App() {
  const token = localStorage.getItem("token");

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<LandingPage />}
          />
          <Route
            path="/login"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/select-department" element={<DepartmentSelect />} />
          <Route
            path="/dashboard"
            element={token ? <DashBoard /> : <Navigate to="/" />}
          />
          <Route path="/chart" element={<CreditsPieChart />} />
          <Route path="/preview" element={<PreviewTable />} />
          <Route path="/noti" element={<Notifications />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
