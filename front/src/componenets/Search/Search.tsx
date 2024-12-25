import  {useEffect} from 'react'
import './Search.css'
import { useNavigate } from 'react-router-dom'
import RouteOptions from '../RouteOptions/RouteOptions'
import SelectNav from '../SelectNav/SelectNav'

export default function Search() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate('/DeadliestAttacks')
  }, [])
  return (
    <>
    <div className="main-select center">
      <SelectNav ></SelectNav>
      </div>
      <RouteOptions></RouteOptions>
    </>
  )
}
