import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ClothesSelector() {
  const [clothesSize, setClothesSize] = React.useState('');

  const handleChange = (event) => {
    setClothesSize(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ mb: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={clothesSize}
          onChange={handleChange}
          autoWidth
          label="Age"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            <MenuItem value='XS'>XS</MenuItem>
            <MenuItem value='S'>S</MenuItem>
            <MenuItem value='M'>M</MenuItem>
            <MenuItem value='L'>L</MenuItem>
            <MenuItem value='XL'>XL</MenuItem>
            <MenuItem value='XXL'>XXL</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}