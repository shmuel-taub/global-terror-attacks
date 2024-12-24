import React, {useState, useRef} from 'react'

import useGet from '../../hooks/useGet'
import { IBar, IMarker } from '../../Types'
import { BASE_URL } from '../../config/config'
import DisplayGraph from '../DisplayGraph/DisplayGraph'

const MAIN_URL = BASE_URL + 'api/relationships/top-groups/'
const GRAPH_URL = MAIN_URL + '?display=graph&'
const MAP_URL = MAIN_URL + '?display=map&'
const REGIONS_URL = BASE_URL + 'api/getters/get-regions/?'

export default function TopGroups() {
  const {data: graphData, errMsg: graphErrMsg, getData: getGraphData} = useGet<IBar>()
  // const {data, errMsg, getData} = useGet<IMarker>()
  const {data: regionsList, getData: refreshRegions} = useGet<string>()

  const [display, setDisplay] = useState('graph')
  const [regionType, setregionType] = useState('region')
  const regionVal = useRef('')
  const limit = useRef(0)
  function handelSendGraph() {
    getGraphData(GRAPH_URL, `regionType=${regionType}&region=${regionVal.current.replace('&', '%26')}&limit=${limit.current}`)
    // console.log('send')
    // console.log(display)
    // console.log(regionType)
    // console.log(regionVal)
    // console.log(limit)
  }

  return (
    <>
    <div className="center">
    <select onChange={e => setDisplay(e.target.value)}>
      <option value='graph'>Display graph</option>
      <option value='map'>Display map</option>
    </select>
    </div>
      {
    (display === 'graph') ? 
    <>
    <div className="center">
    <form action="" className="regular">
      <select onChange={(e) => {
        setregionType(e.target.value)
        refreshRegions(REGIONS_URL, `regionType=${e.target.value}`)
        // regionType.current = e.target.value
      }}>
            <option value="region">choose region</option>
            <option value="country">choose country</option>
            <option value="city">choose city</option>
      </select>
      <label htmlFor='regionVal'>{regionType}</label>
      {regionsList.length ? <select name='regionVal' onChange={e => regionVal.current = e.target.value}>
      {regionsList.map(region => {
        return <option value={region}>{region}</option>
      })}
      </select>: <input type='text' name='regionVal' onChange={e => regionVal.current = e.target.value} /> }
      <label htmlFor='limit'> limit (0 = no limit)</label>
      <input name='limit' type='number' min='0' onChange={e => limit.current = Number(e.target.value)}></input>
      <button onClick={e => {
        e.preventDefault()
        handelSendGraph()
      }}>submit</button>
    </form>
    </div>
    <div className="center"><p className="msg">{graphErrMsg}</p></div>
    <DisplayGraph bars={graphData} height={500}></DisplayGraph>
    </>
     : (display === 'map') ? 
     <>

     </>
    : <></>

      }
    </>
  )
}
