import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setProductSize } from './sizeSelectorSlice';
import { useDispatch } from 'react-redux';



export default function ClothesSelector({ productId }) {
  const [clothesSize, setClothesSize] = React.useState('');
  const dispatch = useDispatch();


  const handleChange = (event) => {
    setClothesSize(event.target.value);
    const size = event.target.value;
    console.log({ productId, size })
    dispatch(setProductSize({ productId, size }));
  };


  return (
    <div>
      <FormControl sx={{ mt: 1, mb: 1, minWidth: 80 }} size="small">
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