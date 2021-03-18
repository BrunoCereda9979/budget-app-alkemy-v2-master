import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [allOperations, setAllOperations] = useState();

  // Get all operations when component rendered
  useEffect(() => {
    fetch("/api/operations")
      .then((res) => res.json())
      .then((data) => setAllOperations(data.message))
      .catch((err) => console.log(err))
  });

  return <div className="App"></div>;
}

export default App;
