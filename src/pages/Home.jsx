import { useContext, useEffect } from 'react'
import AlertContext from '../context/alert/AlertContext'

function Home() {
  const { setAlert } = useContext(AlertContext)

  useEffect(() => {
    setAlert('ERROR', 'SET_ALERT')
  }, [])

  return <div>Home</div>
}
export default Home
