import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AvatarPage from "./pages/avatar";
import ChatPage from "./pages/Chat";
import AuthState from "./context/AuthState.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <AuthState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/setavatar" element={<AvatarPage/>}/>
          <Route path="/chat" element={<ChatPage/>}/>
        </Routes>
      </BrowserRouter>
    </AuthState>
  );
}

export default App;
