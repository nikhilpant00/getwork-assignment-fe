import { BrowserRouter as Router } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <div className="App">
      <Router>
        <AppLayout />
      </Router>
    </div>
  );
}

export default App;
