import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";
import NavBar from "./NavBar"; 
import Footer from "./Footer";


function App() {
  return (
    <>

    <BrowserRouter basename = "/">
          <NavBar />

    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
    
    <Footer />
    </BrowserRouter>
<h1 className="text-3xl font-bold text-blue-500">Hello DevTinder!</h1>
    </>
  );
}

export default App;