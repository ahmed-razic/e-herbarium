import axios from 'axios'

const plants = axios.create({
  baseURL: 'https://explorer.natureserve.org/api/data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

export const getData = async () => {
  const data = JSON.stringify({
    criteriaType: 'species',
    textCriteria: [
      {
        paramType: 'quickSearch',
        searchToken: 'Urspelerpes brucei',
      },
    ],
    statusCriteria: [],
    locationCriteria: [],
    pagingOptions: {
      page: null,
      recordsPerPage: null,
    },
    recordSubtypeCriteria: [],
    modifiedSince: null,
    locationOptions: null,
    classificationOptions: null,
    speciesTaxonomyCriteria: [],
  })

  try {
    const response = await plants.post('/speciesSearch', data)
    if (response.status === 200) {
      console.log('successfully retrieved data')
      return true
    }
    return false
  } catch (error) {
    console.error(error)
    return false
  }
}
