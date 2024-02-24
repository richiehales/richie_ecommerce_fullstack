import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ShoeSelector() {
  const [shoeSize, setShoeSize] = React.useState('');

  const handleChange = (event) => {
    setShoeSize(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ mb: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={shoeSize}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={6}>6</MenuItem>
            <MenuItem value={7}>7</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}