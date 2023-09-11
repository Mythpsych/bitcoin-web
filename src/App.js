import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import HomeComponent from "./Components/HomeComponent";
import InputCard from "./Components/EnterRegisterNumber";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/payment" element={<HomeComponent />}>
          <Route index element={<HomeComponent />} />
          <Route path="payment" element={<HomeComponent />} />
        </Route>
        <Route path="/reg" element={<InputCard />}>
          <Route index element={<InputCard />} />
          <Route path="reg" element={<InputCard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
