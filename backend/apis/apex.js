var axios = require('axios');

axios.get("https://public-api.tracker.gg/v2/apex/standard/profile/origin/iarecoder/sessions", { headers: {"TRN-Api-Key" : '200711b0-1c45-46f2-88d3-44c92ce8a771'} }) 
  .then(response => {
    // access parsed JSON response data using response.data field
    data = response.data
    console.log(data)
  })
  .catch(error => {
    if (error.response) {
      //get HTTP error code

    } else {
      console.log(error.message)
    }
  })

  export default axios;