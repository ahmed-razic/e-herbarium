import { useContext } from 'react'
import AlertContext from '../context/alert/AlertContext'
import { ReactComponent as AlertIcon } from '../assets/svg/alertIcon.svg'

function Alert() {
  const { alert } = useContext(AlertContext)

  return (
    alert !== null && (
      <div className='flex items-start mb-4 space-x-2'>
        <AlertIcon />
        <p className='flex-1 text-base font-semibold leading-7 text-gray-700'>
          <strong>{alert.msg}</strong>
        </p>
      </div>
    )
  )
}

export default Alert
