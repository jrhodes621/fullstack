import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
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
    chips: {
        margin: "8px 0px",
    },
    chip: {
        margin: theme.spacing(0.5)
    }
}));
function App() {
  const classes = useStyles();

  const [selectedLocations, setSelectedLocations] = useState([]);

  const onChangeLocation = async(event, value) => {
      if(!value) {
          return
      }

      try {
          const response = await fetch(`http://localhost:3000?lat=${value.latitude}&long=${value.longitude}`);
          if(response.status >= 400) {
              return
          }
          const weather = await response.json();

          const city = selectedLocations.find(location => { return location.name === value.name });
          if(city) {
              city.weather = weather;
              setSelectedLocations([...selectedLocations]);
          } else {
              value.weather = weather;
              setSelectedLocations([...selectedLocations, value]);
          }
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
        <div className={classes.chips}>
            {selectedLocations.map((location, index) => {
               return <Chip className={classes.chip} key={index} label={`${location.name} - ${location.weather.description}`} />
            })}
        </div>
    </div>
  );
}

export default App;
