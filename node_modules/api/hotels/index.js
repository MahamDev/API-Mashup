const axios = require('axios');

const GEO_DB_API_KEY = '19f6d070d4msh76af06e0a034039p16393ajsn6740f60e85e9';
const TRIP_ADVISOR_API_KEY = '19f6d070d4msh76af06e0a034039p16393ajsn6740f60e85e9';

const getCityDetails = async (cityId) => {
  try {
    const response = await axios.get(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities/${cityId}`, {
      headers: {
        'x-rapidapi-key': '19f6d070d4msh76af06e0a034039p16393ajsn6740f60e85e9',
        'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
      }
    });

    // extract the city name from the response
    const cityName = response.data.data.name;

    // search for locations in TripAdvisor API using city name
    const tripAdvisorResponse = await axios.get(`https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation`, {
      headers: {
        'x-rapidapi-key': '19f6d070d4msh76af06e0a034039p16393ajsn6740f60e85e9',
        'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
      },
      params: {
        query: cityName,
        limit: 10
      }
    });

    // return the TripAdvisor response
    return tripAdvisorResponse.data;
  } catch (error) {
    console.error(error);
  }
};

// call the function and log the response
getCityDetails('Q64')
  .then(response => console.log(response))
  .catch(error => console.error(error));
