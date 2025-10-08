import React, { useState } from 'react';
import type { ClinicTiming } from '../type';
import  { emptyClinic } from '@/pages/Clinic/types';

interface Props {
  initialData?: ClinicTiming;
  onSubmit: (data: ClinicTiming) => void;
  onCancel: () => void;
}


const ClinicTimingForm: React.FC<Props> = ({ initialData, onSubmit, onCancel }) => {
  const [dayOfWeek, setDayOfWeek] = useState(initialData?.dayOfWeek || 0);
  const [openingTime, setOpeningTime] = useState(initialData?.openingTime || '');
  const [closingTime, setClosingTime] = useState(initialData?.closingTime || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      clinicTimingId: initialData?.clinicTimingId || 0,
      clinicId: initialData?.clinicId || 0,
      clinic: initialData?.clinic || emptyClinic,
      dayOfWeek,
      openingTime,
      closingTime
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Day of Week:
        <input
          type="number"
          value={dayOfWeek}
          onChange={e => setDayOfWeek(Number(e.target.value))}
          min={0}
          max={6}
        />
      </label>
      <label>
        Opening Time:
        <input
          type="time"
          value={openingTime}
          onChange={e => setOpeningTime(e.target.value)}
        />
      </label>
      <label>
        Closing Time:
        <input
          type="time"
          value={closingTime}
          onChange={e => setClosingTime(e.target.value)}
        />
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ClinicTimingForm;
