import { Routes, Route, useLocation } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AllProperties from "./components/AllProperties";
import PropertyDetails from "./components/PropertiesDetails";
import Profile from "./components/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Subscription from "./components/Subscription";
import Sell from "./components/Sell";
import OwnerProfile from "./components/OwnerProfile";
import ChatRoomModal from "./components/ChatRoomModal";
import OwnerInbox from "./components/OwnerInbox";
import About from "./components/About";
import ImageTrail from "./components/About";

const App = () => {
  const location = useLocation(); // ✅ this brings pathname
  const hideNavbarPaths = ['/login', '/register', '/test'];
  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <ToastContainer
  position="top-center"  // 👈 Center aakum
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="light"
/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/allproperties" element={<AllProperties />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/subscription" element={<Subscription/>}/>
        <Route path='/sell' element={<Sell/>}/>
        <Route path="/profile/:id" element={<OwnerProfile />} />
        <Route path='/owner/inbox' element={<OwnerInbox/>}/>
        <Route path='/about' element={<ImageTrail/>}/>
      </Routes>

      {/* {user && (
  <button
    className="fixed bottom-6 right-6 w-58 bg-blue-600 text-white text-lg py-3 rounded-xl shadow-lg hover:bg-blue-700 transition z-50 flex items-center justify-center gap-2"
    onClick={() => setIsChatOpen(true)}
  >
    💬 Chat
  </button>
)} */}

      {/* 💬 Chat Room Modal */}
      {/* <ChatRoomModal
        isOpen={isChatOpen}
        senderId={senderId}
        receiverId={receiverId}
        onClose={() => setIsChatOpen(false)}
      /> */}
      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default App;
