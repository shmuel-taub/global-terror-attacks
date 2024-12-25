import { useNavigate } from 'react-router-dom'

export default function SelectNav() {
    const navigate  = useNavigate()
  return (
    <>
      <select onChange={e => navigate(`/${e.target.value}`)} className='main-select'>
      <option value="DeadliestAttacks">Get deadliest attacks types</option>
      <option value="MostCasultyRegions">Get highest casualty regions</option>
      <option value="DateTrends">Get incident trends</option>
      <option value="TopGroups">Get top groups</option>
      <option value="GroupsByYear">Get groups by year</option>
      <option value="DeadliestRegionsOfGroup">Get Deadliest regions of group</option>
      </select>
    </>
  )
}
