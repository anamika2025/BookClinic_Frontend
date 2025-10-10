// src/components/clinics/ClinicList.tsx

"use client";
import { useEffect, useState } from "react";
import { getClinics, deleteClinic } from "@/library/clinicApi";
import ClinicDialog from "./ClinicDialog";
import { Button } from "@/components/ui/button";
import type { Clinic } from "@/pages/types/types";

export default function ClinicList() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [open, setOpen] = useState(false);
  const [editingClinic, setEditingClinic] = useState<Clinic | null>(null);

  const loadClinics = async () => {
    const data = await getClinics();
    setClinics(data);
  };

  useEffect(() => {
    loadClinics();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this clinic?")) return;
    await deleteClinic(id);
    loadClinics();
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Clinics</h2>
        <Button onClick={() => { setEditingClinic(null); setOpen(true); }}>
          Add Clinic
        </Button>
      </div>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">City ID</th>
            <th className="p-2">State ID</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((clinic) => (
            <tr key={clinic.clinicId} className="border-t">
              <td className="p-2">{clinic.clinicName}</td>
              <td className="p-2">{clinic.cityId}</td>
              <td className="p-2">{clinic.stateId}</td>
              <td className="p-2">{clinic.contactNumber}</td>
              <td className="p-2">{clinic.status}</td>
              <td className="p-2 space-x-2">
                <Button variant="outline" onClick={() => {
                  setEditingClinic(clinic);
                  setOpen(true);
                }}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(clinic.clinicId)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ClinicDialog
        open={open}
        setOpen={setOpen}
        refresh={loadClinics}
        clinic={editingClinic}
      />
    </div>
  );
}
