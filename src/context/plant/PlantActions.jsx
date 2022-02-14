import axios from 'axios'

const plants = axios.create({
  baseURL: 'https://explorer.natureserve.org/api/data',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
})

export const searchPlants = async (text) => {
  const data = JSON.stringify({
    criteriaType: 'species',
    textCriteria: [
      {
        paramType: 'textSearch',
        searchToken: text,
        matchAgainst: 'primaryCommonName',
        operator: 'similarTo',
      },
    ],
    statusCriteria: [
      {
        paramType: 'globalRank',
        globalRank: 'G1',
      },
    ],
    locationCriteria: [],
    pagingOptions: {
      page: 0,
      recordsPerPage: 9,
    },
    modifiedSince: null,
    locationOptions: null,
    classificationOptions: null,
    speciesTaxonomyCriteria: [],
  })

  try {
    const response = await plants.post('/speciesSearch', data)
    if (response.status === 200) {
      console.log('successfully retrieved data')
      return response.data.results
    }
    return false
  } catch (err) {
    console.error(err)
    return false
  }
}

/*Alternative way of retriving data 
  export const natureServe = () => {
  var url = 'https://explorer.natureserve.org/api/data/speciesSearch'

  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)
  xhr.setRequestHeader('Accept', 'application/json')
  xhr.setRequestHeader('Content-Type', 'application/json')

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status)
      console.log(xhr.responseText)
    }
  }

  var data = `{
  "criteriaType" : "species",
  "textCriteria" : [{
    "paramType" : "quickSearch",
    "searchToken" : "Urspelerpes brucei"
  }
   ],
  "statusCriteria" : [ ],
  "locationCriteria" : [ ],
  "pagingOptions" : {
    "page" : null,
    "recordsPerPage" : null
  },
  "recordSubtypeCriteria" : [ ],
  "modifiedSince" : null,
  "locationOptions" : null,
  "classificationOptions" : null,
  "speciesTaxonomyCriteria" : [ ]
}`
  xhr.send(data)
} */
