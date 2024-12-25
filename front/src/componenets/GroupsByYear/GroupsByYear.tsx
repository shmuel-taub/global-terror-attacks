import  { useRef, useState } from "react";
import useGet from "../../hooks/useGet";
import { BASE_URL } from "../../config/config";
import DisplayGraph from "../DisplayGraph/DisplayGraph";
import { IBar } from "../../Types";
const URL = BASE_URL + 'api/relationships/groups-by-year/?'
// const YEARS_URL = BASE_URL + '/api/getters/get-years'
// const GROUPS_URL = BASE_URL + '/api/getters/get-groups'

export default function GroupsByYear() {
  const [filter, setFilter] = useState("year");
  const inputVal = useRef("");
  const {data, getData, errMsg} = useGet<IBar>()
  const {data: optionList, /*getData: refreshList*/} = useGet<string>()
  function handleSend() {
    getData(URL, `${filter}=${inputVal.current}&${filter === 'year' ? 'limit=10' : ''}`)
  }
  return (
    <>
    <div className="center">
    <form  className="regular">
      <select onChange={(e) => setFilter(e.target.value)}>
        <option value="year">Choose year</option>
        <option value="gname">Choose group</option>
      </select>
      <label htmlFor="year-name-input">
        {filter === "year" ? "Enter the year" : "Enter the group name"}
      </label>
      {optionList.length ? <select name='year-name-input' onChange={e => inputVal.current = e.target.value}>
      {optionList.map(option => {
        return <option value={option}>{option}</option>
      })} 
      </select>
      : <input
        name="year-name-input"
        type={filter === "year" ? "number" : "text"}
        onChange={(e) => (inputVal.current = e.target.value)}
      ></input>}
      <button onClick={e =>{
        e.preventDefault()
        handleSend()
      } }>submit</button>
      </form>
      </div>
      <div className="center"><p>{errMsg}</p></div>
      <DisplayGraph bars={data} height={500}></DisplayGraph>
    </>
  );
}
