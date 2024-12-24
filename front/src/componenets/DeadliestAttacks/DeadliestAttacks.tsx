import React, {useState} from 'react'
import DisplayGraph from '../DisplayGraph/DisplayGraph'
import useGet from '../../hooks/useGet'
import { IBar } from '../../Types'
import { BASE_URL } from '../../config/config'
const URL = BASE_URL + 'api/analysis/deadliest-attack-types/'

export default function DeadliestAttacks() {
  // const [data, setData] = useState([])
  const {data, errMsg, getData} = useGet<IBar>()
  return (
    <div>
      <div className="center">
      <button onClick={e => getData(URL, '')}>submit</button>
      </div>
      <p>{errMsg}</p>
      <DisplayGraph bars={data} height={500} />
    </div>
  )
}
