import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'

function Contact() {
  const [message, setMessage] = useState('')
  const [collector, setCollector] = useState(null)
  //eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  const params = useParams()

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, 'users', params.collectorId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setCollector(docSnap.data())
      } else {
        toast.error('Could not get collector data')
      }
    }

    getLandlord()
  }, [params.collectorId])

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Collector</p>
      </header>

      {collector !== null && (
        <main>
          <div className='contactCollector'>
            <p className='collectorName'>Contact {collector?.name}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                cols='30'
                rows='10'
                value={message}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${collector.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
