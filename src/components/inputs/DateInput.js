import RNDateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { getDateStr } from '../../functions/date';
import TextButton from '../clickable/TextButton';

const DateInput = ({
    label,
    value,
    onDateChange,
}) => {
    const [open, setOpen] = useState(false)

    return <>
        {open && <RNDateTimePicker 
            value={value || new Date()}
            onChange={(event, newDate) => {
                setOpen(false);
                onDateChange(newDate);
            }}
        />}
        <TextButton 
            isEnabled
            text={`${label}${value ? ': ' + getDateStr(value) : ''}`}
            color='bg-text-alternate'
            onClick={() => setOpen(true)}
            align='start'
        />
    </>;
  }

  export default DateInput;