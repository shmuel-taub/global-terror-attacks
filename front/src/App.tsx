import { StrictMode, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Search from "./componenets/Search/Search";
import  DisplayMap from './componenets/DisplayMap/DisplayMap'
// import DisplayGraph from "./componenets/DisplayGraph/DisplayGraph";
import "./App.css";
import { IMarker } from "./Types";
const markers = [
  {
    areaName: 'Unitad Kingdoom',
    location: [51.605, -0.19] as [number, number],
    messages: ['This is where Harry', ' Potter was lived']
  },
  {
    areaName: 'Unitad Kingdoom',
    location: [51.505, -0.09] as [number, number],
    messages: ['This is where Alcus Dumbuldor was lived']
  },
  
]

const data = [
  { name: "Page A", value: 400 },
  { name: "Page B", value: 400 },
  { name: "Page C", value: 523 },
  { name: "Page E", value: 1531 },
];

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <StrictMode>
        <BrowserRouter>
        {/* <DisplayGraph bars={data} height={500}></DisplayGraph> */}
        {/* <DisplayMap markers={markers} height="500px"></DisplayMap> */}
          <Search />
        </BrowserRouter>
      </StrictMode>
    </>
  );
}

export default App;
