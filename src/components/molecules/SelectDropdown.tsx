import { FormControl, MenuItem, TextField } from '@/atoms'

export const SelectDropdown = (props: {
  value?: string
  onChange: (value: string) => void
  label: string
  items: { value: string; name: string }[]
}) => {
  const { items, label, value, onChange } = props

  return (
    <FormControl fullWidth>
      <TextField
        label={label}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        select
      >
        {items.map((item, i) => (
          <MenuItem key={`selectdrop-${label}-${i}`} value={item.value}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
    </FormControl>
  )
}
