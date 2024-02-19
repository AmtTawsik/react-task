import { Routes, Route, useLocation } from "react-router-dom";
import Problem1 from "./components/Problem-1.jsx";
import Menu from "./components/Menu.jsx";
import Problem2 from "./components/Problem-2.jsx";
import ModalA from "./components/Modal-A.jsx";
import ModalB from "./components/Modal-B.jsx";
import Index from "./components/Index.jsx";

function App() {
  const location = useLocation();

  const modalAPage = location.pathname === "/modal-a";
  const modalBPage = location.pathname === "/modal-b";

  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        {!modalAPage && !modalBPage && (
          <Route path="/" element={<Menu />}>
            <Route path="problem-1" element={<Problem1 />} />
            <Route path="problem-2" element={<Problem2 />} />
          </Route>
        )}
        
        <Route path="modal-a" element={<ModalA />} />
        <Route path="modal-b" element={<ModalB />} />
      </Routes>
    </>
  );
}

export default App;
