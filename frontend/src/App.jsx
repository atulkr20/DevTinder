import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NavBar from "./components/NavBar"; 
import Footer from "./components/Footer";
import { Provider } from "react-redux"; 
import appStore from "./utils/appStore";


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
    </Routes>
    
    <Footer />
    </BrowserRouter>
    </Provider>
    </>
  );
}

export default App;