import { FormControl, MenuItem, Select } from '@/atoms'

export const SelectDropdown = (props: {
  value?: string
  onChange: (value: string) => void
  label: string
  items: { value: string; name: string }[]
}) => {
  const { items, label, value, onChange } = props
  return (
    <Select value={value} onChange={(e) => onChange(e.target.value)}>
      {items.map((item, i) => (
        <option key={`selectdrop-${label}-${i}`} value={item.value}>
          {item.name}
        </option>
        // <MenuItem key={`selectdrop-${label}-${i}`} value={item.value}>
        //   {item.name}
        // </MenuItem>
      ))}
    </Select>
  )

  // return (
  //   <FormControl fullWidth>
  //     <TextField
  //       label={label}
  //       value={value || ''}
  //       onChange={(e) => onChange(e.target.value)}
  //       select
  //     >
  //       {items.map((item, i) => (
  //         <MenuItem key={`selectdrop-${label}-${i}`} value={item.value}>
  //           {item.name}
  //         </MenuItem>
  //       ))}
  //     </TextField>
  //   </FormControl>
  // )
}
