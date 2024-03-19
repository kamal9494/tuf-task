import { useState } from "react";
import Navbar from "./components/Navbar";
import Submissions from "./components/Submissions";
import Form from "./components/Form";
import { Toaster } from "sonner";
import { Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
      <Toaster position="top-center" expand={true} richColors />
      <Navbar />
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/submissions" element={<Submissions />} />
      </Routes>
    </>
  );
}

export default App;
