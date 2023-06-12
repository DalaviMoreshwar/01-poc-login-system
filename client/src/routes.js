import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./features/auth/Login";
import Home from "./features/home/Home";
import Profile from "./features/profile/Profile";
import PrivateRoutes from "./features/auth/PrivateRoutes";
import { isLoggedUser } from "./utils/browserDB";

const queryClient = new QueryClient();

const App = () => {
  const loggedUser = isLoggedUser();
  console.log(loggedUser);
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route exact path="/" element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
