import { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { db } from '../firebase.config';
import { doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

function EditPlant() {
  //eslint-disable-next-line
  const [geolocationEnabled, setGeolocationEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plant, setPlant] = useState(false);
  const [formData, setFormData] = useState({
    altitude: 300,
    collectorName: '',
    collectorEmail: '',
    commonName: '',
    family: '',
    genus: '',
    longitude: 18.413029,
    latitude: 43.85643,
    images: {},
    location: '',
    note: '',
    scientificName: '',
  });

  const {
    altitude,
    collectorName,
    collectorEmail,
    commonName,
    family,
    genus,
    longitude,
    latitude,
    images,
    location,
    note,
    scientificName,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const params = useParams();
  const isMounted = useRef(true);

  useEffect(() => {
    if (plant && plant.userRef !== auth.currentUser.uid) {
      toast.error(
        'You cannot edit this plant. Please sign in if this is your input'
      );
      navigate('/');
    }
  });

  useEffect(() => {
    setLoading(true);
    const fetchPlant = async () => {
      const docRef = doc(db, 'plants', params.plantId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPlant(docSnap.data());
        setFormData({ ...docSnap.data() });
        setLoading(false);
      } else {
        navigate('/');
        toast.error('Plant does not exist');
      }
    };
    fetchPlant();
  }, [params.id, navigate]);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({ ...formData, userRef: user.uid });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (images.length > 5) {
      setLoading(false);
      toast.error('You can enter maximum of 5 images');
      return;
    }

    let geolocation = {};

    geolocation.latitude = latitude;
    geolocation.longitude = longitude;
    /*GOOGLE GEOLOCATION (NIJE VISE BESPLATNO) 
    if (geolocationEnabled) {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`
      )

      const data = await response.json()

      geolocation.latitude = data.results[0]?.geometry.location.lat ?? 0
      geolocation.longitude = data.results[0]?.geometry.location.lng ?? 0

      location =
        data.status === 'ZERO_RESULTS'
          ? undefined
          : data.results[0]?.formatted_address

      if (location === undefined || location.includes('undefined')) {
        setLoading(false)
        toast.error('Please enter a correct address')
        return
      }
    } else {
      geolocation.latitude = latitude
      geolocation.longitude = longitude
    } */

    const storeImage = async (image) => {
      return new Promise((resolve, reject) => {
        const storage = getStorage();
        const fileName = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;

        const storageRef = ref(storage, 'images/' + fileName);

        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            reject(error);
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch(() => {
      setLoading(false);
      toast.error('Images not uploaded');
      return;
    });

    const formDataCopy = {
      ...formData,
      imgUrls,
      geolocation,
      timestamp: serverTimestamp(),
    };

    delete formDataCopy.images;
    delete formDataCopy.location;

    const docRef = doc(db, 'plants', params.plantId);
    await updateDoc(docRef, formDataCopy);
    setLoading(false);
    toast.success('Plant saved in database');
    navigate(`/plant/${docRef.id}`);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }
    if (e.target.value === 'false') {
      boolean = false;
    }

    // Files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Booleans/Numbers
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Edit Plant</p>
      </header>

      <main>
        <form onSubmit={onSubmit}>
          <label className='formLabel'>Common Name</label>
          <input
            className='formInputName'
            type='text'
            id='commonName'
            value={commonName}
            onChange={onMutate}
            maxLength='33'
            minLength='3'
            required
            placeholder='Rose'
          />

          <div className='flex-column'>
            <div>
              <label className='formLabel'>Scientific Name</label>
              <input
                className='formInputSmall'
                type='text'
                id='scientificName'
                value={scientificName}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='Rosa gallica'
              />
            </div>
            <div>
              <label className='formLabel'>Family</label>
              <input
                className='formInputSmall'
                type='text'
                id='family'
                value={family}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='Rosaceade'
              />
            </div>
            <div>
              <label className='formLabel'>Genus</label>
              <input
                className='formInputSmall'
                type='text'
                id='genus'
                value={genus}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='Rosa'
              />
            </div>
            <div>
              <label className='formLabel'>Collector Name</label>
              <input
                className='formInputSmall'
                type='text'
                id='collectorName'
                value={collectorName}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='Ahmed Razic'
              />
            </div>
            <div>
              <label className='formLabel'>Collector Email</label>
              <input
                className='formInputSmall'
                type='email'
                id='collectorEmail'
                value={collectorEmail}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='ahmed.razic@gmail.com'
              />
            </div>
            <div>
              <label className='formLabel'>Location</label>
              <input
                className='formInputSmall'
                type='text'
                id='location'
                value={location}
                onChange={onMutate}
                maxLength='33'
                minLength='3'
                required
                placeholder='Sarajevo'
              />
            </div>
            <div>
              <label className='formLabel'>Altitude</label>
              <input
                className='formInputSmall'
                type='number'
                id='altitude'
                value={altitude}
                onChange={onMutate}
                min='0'
                max='3000'
                step={25}
                required
                placeholder='500'
              />
            </div>
            <div>
              <label className='formLabel'>Note</label>
              <textarea
                className='formInputAddress'
                type='text'
                id='note'
                value={note}
                onChange={onMutate}
                required
                placeholder='Enter note'
              />
            </div>
          </div>

          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  className='formInputSmall'
                  type='number'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
          <label className='formLabel'>Images</label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            className='formInputFile'
            type='file'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button type='submit' className='primaryButton createListingButton'>
            Save Changes
          </button>
        </form>
      </main>
    </div>
  );
}

export default EditPlant;
