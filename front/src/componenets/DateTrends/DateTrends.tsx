import  {  useState } from "react";
import { BASE_URL } from "../../config/config";
import useGet from "../../hooks/useGet";
import DisplayGraph from "../DisplayGraph/DisplayGraph";
import { IBar } from "../../Types";
// import { useRef } from 'react'
const URL = BASE_URL + "api/analysis/incident-trends/?";

export default function DateTrends() {
  const { data, errMsg, getData } = useGet<IBar>();
  const [filter, setFilter] = useState("one-year");
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  function handleSend() {
    // todo handle start > end on client side
    if (filter === "one-year" || filter === "range-years") {
      getData(URL, `start=${start}&end=${end}`);
    } else {
      const currentYear = new Date().getFullYear();
      getData(
        URL,
        `start=${
          currentYear - (filter === "last-five" ? 4 : 9)
        }&end=${currentYear}`
      );
    }
  }

  let form;
  if (filter === "one-year") {
    form = (
      <>
        <label htmlFor="the-year">Entwr the year</label>
        <input
          type="number"
          name="the-year"
          onChange={(e) => {
            setStart(Number(e.target.value));
            setEnd(Number(e.target.value));
          }}
        ></input>
      </>
    );
  } else if (filter === "range-years") {
    form = (
      <>
        <label htmlFor="start">from year</label>
        <input type="number" name="start" max={end} onChange={e => setStart(Number(e.target.value))}></input>
        <label htmlFor="end">to year</label>
        <input type="number" name="end" min={start} onChange={e => setEnd(Number(e.target.value))}></input>
      </>
    );
  }

  return (
    <>
    <div className="center">
      <form className="regular">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="one-year">Choose one year</option> 
        <option value="range-years">Choose range of years</option>
        <option value="last-five">Last five years</option>
        <option value="last-ten">Last ten years</option>
      </select>
      {form}
      <button onClick={(e) => {
        e.preventDefault()
        handleSend()
      }}>submit</button>
      </form>
      </div>
      <div className="msg">{errMsg}</div>
      <DisplayGraph bars={data} height={500}></DisplayGraph>
    </>
  );
}
