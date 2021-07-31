import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import fetch from 'cross-fetch';

const locations = [
  {
    name: 'New York, NY',
    longitude: -73.935242,
    latitude: 40.73061,
  },
  {
    name: 'New Haven, CT',
    longitude: -72.929916,
    latitude: 41.310726,
  },
  {
    name: 'Springfield, IL',
    longitude: -89.650002,
    latitude: 39.799999,
  },
  {
    name: 'Austin, TX',
    longitude: -97.73333,
    latitude: 30.266666,
  },
];
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));
function App() {
  const classes = useStyles();

  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const onChangeLocation = async(event, value) => {
      if(!value) {
          return
      }
      setLocation(value);
      try {
          const response = await fetch(`http://localhost:3000?lat=${value.latitude}&long=${value.longitude}`);
          if(response.status >= 400) {
              return
          }
          const weather = await response.json();
          setWeather(weather);
      } catch(err) {
          console.log(err)
      }
  };
  return (
    <div>
      <h1>Welcome to Warmly</h1>
      <h2>Autocomplete dropdown examples</h2>
        <FormControl className={classes.formControl}>
            <Autocomplete
                id="combo-box-demo"
                options={locations}
                getOptionLabel={option => option.name}
                style={{ width: 300 }}
                renderInput={params => (
                    <TextField {...params} label="City" variant="outlined" fullWidth />
                )}
                onChange={onChangeLocation}
            />
        </FormControl>
        {location && <div>
            Weather for <Typography variant={"h6"}>{location.name}</Typography>
        </div>}
        {weather && <div>
            <Typography variant={"h6"}>{weather.description}</Typography>
        </div>}
    </div>
  );
}

export default App;
