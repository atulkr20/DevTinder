import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer";
import { Provider } from "react-redux"; 
import appStore from "./utils/appStore";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";


function App() {
  return (
    <>
    <Provider store = {appStore}>
    <BrowserRouter basename = "/">
          <NavBar />
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/connections" element={<Connections />} />
      <Route path = "/requests" element={<Requests />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    
    <Footer />
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;