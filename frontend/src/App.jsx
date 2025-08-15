import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./componenets/Body";
import Login from "./componenets/Login";
import Profile from "./componenets/Profile";
import NavBar from "./componenets/NavBar"; 
import Footer from "./componenets/Footer";
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