import React from 'react';
import type { ClinicTiming } from '../type';

interface Props {
  timings: ClinicTiming[];
  onEdit: (timing: ClinicTiming) => void;
  onDelete: (id: number) => void;
}

const ClinicTimingList: React.FC<Props> = ({ timings, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Clinic Timings</h2>
      <table>
        <thead>
          <tr>
            <th>Day of Week</th>
            <th>Opening Time</th>
            <th>Closing Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {timings.map(t => (
            <tr key={t.clinicTimingId}>
              <td>{t.dayOfWeek}</td>
              <td>{t.openingTime}</td>
              <td>{t.closingTime}</td>
              <td>
                <button onClick={() => onEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.clinicTimingId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClinicTimingList;
