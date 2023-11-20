import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/Detail/Detail";
import FormPage from "./components/FormPage/FormPage";
import Error from "./components/Error/Error";

import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/countries" element={<Home />} />
        <Route path="/countries/:id" element={<Detail />} />
        <Route path="/activities" element={<FormPage />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
