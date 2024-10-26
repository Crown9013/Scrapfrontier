import "./style.min.css";
import "./libs.min.css";
import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// import Faq from "./pages/Admin/Faq.jsx";
import Rules from "./pages/Admin/Rules";
import Footer from "./pages/Layout/Footer.jsx";
import Header from "./pages/Layout/Header.jsx";
import AdminHome from "./pages/Admin/Home.jsx";
import Featured from "./pages/Admin/Featured.jsx";
import Howtostart from "./pages/Admin/Howtostart/index.jsx";
import TournamentAndEvent from "./pages/Admin/TournamentAndEvent.jsx";
import Support from "./pages/Admin/Support/index.jsx";
import Login from "./pages/Auth/Login.jsx";
import Signup from "./pages/Auth/Signup.jsx";
import { AuthGuard } from "./helper/auth.guard.js";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="m-page">
        <div className="wrapper">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/login' element={<Login/>} />
              <Route path='/register' element={<Signup/>} />
            </Routes>
            <Routes>
              <Route element={<AuthGuard />}>
                <Route path="/" element={<AdminHome />} />
                <Route path="/featured" element={<Featured />} />
                <Route
                  path="/tournament_and_events"
                  element={<TournamentAndEvent />}
                />
                <Route path="howtostart" element={<Howtostart />}/>
                {/* <Route path="support" element={<Support />}/> */}
                <Route path="rules" element={<Rules />}/>
              </Route>
            </Routes>
            <Footer />
          </BrowserRouter>
        </div>
        <Toaster position="top-center" />
      </div>
    </QueryClientProvider>
  );
}

export default App;
