import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { setProductSize } from './sizeSelectorSlice';
import { useDispatch } from 'react-redux';



export default function ShoeSelector({ productId }) {
  const [shoeSize, setShoeSize] = React.useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setShoeSize(event.target.value);
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