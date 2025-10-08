"use client";
import { useEffect, useState } from "react";
import { getClinics, deleteClinic } from "@/library/clinicApi";
import ClinicDialog from "@/pages/Clinic/ClinicDialog";
import { Button } from "@/components/ui/button";
import type { Clinic } from "@/types";

export default function ClinicList() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [open, setOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  const loadClinics = async () => setClinics(await getClinics());

  useEffect(() => { loadClinics(); }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this clinic?")) return;
    await deleteClinic(id);
    loadClinics();
  };

  return (
    <div className="p-4">
      <Button onClick={() => { setEditingClinic(null); setOpen(true); }}>
        Add Clinic
      </Button>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Name</th>
            <th className="p-2">City</th>
            <th className="p-2">Address</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((c) => (
            <tr key={c.clinicID} className="border-t">
              <td className="p-2">{c.name}</td>
              <td className="p-2">{c.city}</td>
              <td className="p-2">{c.address}</td>
              <td className="p-2 space-x-2">
                <Button variant="outline" onClick={() => { setEditingClinic(c); setOpen(true); }}>Edit</Button>
                <Button variant="destructive" onClick={() => handleDelete(c.clinicID)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClinicDialog open={open} setOpen={setOpen} refresh={loadClinics} clinic={editingClinic}/>
    </div>
  );
}
