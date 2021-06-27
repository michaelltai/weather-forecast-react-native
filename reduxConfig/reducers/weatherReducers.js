const initialState = {
  weatherList: [],
  hourlyList: [],
  fetchComplete: false,
  hourlyFetchComplete: false,
};

const weatherReducers = (state = initialState, action) => {
  switch (action.type) {
    case "WRITE_WEEKLY_WEATHER": {
      return {
        ...state,
        weatherList: action.payload,
        fetchComplete: true,
      };
    }
    case "WRITE_HOURLY_WEATHER": {
      return {
        ...state,
        hourlyList: action.payload,
        hourlyFetchComplete: true,
      };
    }
    default: {
      return state;
    }
  }
};

export default weatherReducers;
