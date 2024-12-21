import { Route, Routes } from "react-router-dom";
import Stream from "./pages/Stream/Stream";

function App() {
    return (
        <Routes>
            <Route path="/*" element={<Stream />} />
        </Routes>
    );
}

export default App;
