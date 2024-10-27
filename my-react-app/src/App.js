
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuoteList from "./pages/QuoteList";
import QuoteCreation from "./pages/QuoteCreation";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuoteList />} />
          <Route path="/create-quote" element={<QuoteCreation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
