import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import NavBar from "./NavBar"; 
import Footer from "./Footer";
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