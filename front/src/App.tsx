import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import Search from "./componenets/Search/Search";


function App() {

  return (
    <>
      <StrictMode>
        <BrowserRouter>
          <Search />
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
