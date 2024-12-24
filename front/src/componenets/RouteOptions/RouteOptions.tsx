import {useNavigate, Route, Routes} from 'react-router-dom'
import DateTrends from '../DateTrends/DateTrends'
import DeadliestAttacks from '../DeadliestAttacks/DeadliestAttacks'
import DeadliestRegionsOfGroup from '../DeadliestRegionsOfGroup/DeadliestRegionsOfGroup'
import GroupsByYear from '../GroupsByYear/GroupsByYear'
import MostCasultyRegions from '../MostCasultyRegions/MostCasultyRegions'
import TopGroups from '../TopGroups/TopGroups'
import React from 'react'

export default function RouteOptions() {
  return (
      <Routes>
        <Route path='/DeadliestAttacks' element={<DeadliestAttacks />}></Route>
        <Route path='/DateTrends' element={<DateTrends />}></Route>
        <Route 
            path='/DeadliestRegionsOfGroup' 
            element={<DeadliestRegionsOfGroup />}>
        </Route>
        <Route path='/GroupsByYear' element={<GroupsByYear />}></Route>
        <Route path='/MostCasultyRegions' element={<MostCasultyRegions />}></Route>
        <Route path='/TopGroups' element={<TopGroups />}></Route>
      </Routes>
  )
}
