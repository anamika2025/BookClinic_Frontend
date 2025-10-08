import React, { useEffect, useState } from 'react';
import { fetchClinicTimings, createClinicTiming, updateClinicTiming, deleteClinicTiming } from '@/library/api';
import ClinicTimingList from '@/pages/Clinic/ClinicTimingList';
import ClinicTimingForm from '@/pages/Clinic/ClinicTimingForm';
import type { ClinicTiming } from '@/pages/type';

const ClinicTimingsPage: React.FC = () => {
  const [clinicId] = useState(1); // for example
  const [timings, setTimings] = useState<ClinicTiming[]>([]);
  const [editing, setEditing] = useState<ClinicTiming | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchClinicTimings(clinicId).then(res => setTimings(res.data));
  }, [clinicId]);

  const handleCreateOrUpdate = async (timing: ClinicTiming) => {
    if (timing.clinicTimingId === 0) {
      await createClinicTiming(timing);
    } else {
      await updateClinicTiming(timing.clinicTimingId, timing);
    }
    const res = await fetchClinicTimings(clinicId);
    setTimings(res.data);
    setShowForm(false);
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deleteClinicTiming(id);
    const res = await fetchClinicTimings(clinicId);
    setTimings(res.data);
  };

  return (
    <div>
      <h1>Clinic Timings Management</h1>
      {!showForm && <button onClick={() => setShowForm(true)}>Add Timing</button>}
      {showForm && (
        <ClinicTimingForm
          initialData={editing || undefined}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => { setShowForm(false); setEditing(null); }}
        />
      )}
      <ClinicTimingList timings={timings} onEdit={(t) => { setEditing(t); setShowForm(true); }} onDelete={handleDelete} />
    </div>
  );
};

export default ClinicTimingsPage;
