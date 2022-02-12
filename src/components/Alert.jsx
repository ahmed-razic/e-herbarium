import { useContext, useEffect } from 'react'
import AlertContext from '../context/alert/AlertContext'
import { ReactComponent as AlertIcon } from '../assets/svg/alertIcon.svg'

function Alert() {
  const { alert, setAlert } = useContext(AlertContext)

  useEffect(() => {
    setAlert('This is an Error', 'SET_ALERT')
    console.log(alert)
  }, [])

  return (
    alert !== null && (
      <p className='flex items-start mb-4 space-x-2'>
        <AlertIcon />
        <p className='flex-1 text-base font-semibold leading-7 text-white'>
          <strong>{alert.msg}</strong>
        </p>
      </p>
    )
  )
}

export default Alert
