"use client";
import { useEffect, useState } from "react";
import { getClinics, deleteClinic } from "@/library/clinicApi";
import ClinicDialog from "@/pages/Clinic/ClinicDialog";
import { Button } from "@/components/ui/button";
import type { Clinic } from "@/types";

interface ClinicManagementProps {
  useTable?: boolean; // Optional: Use table or list UI
}

export default function ClinicManagement({ useTable = false }: ClinicManagementProps) {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState<Clinic | null>(null);

  const refresh = async () => {
    const data = await getClinics();
    setClinics(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this clinic?")) return;
    await deleteClinic(id);
    refresh();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Clinic Management</h1>
      <Button
        onClick={() => {
          setSelectedClinic(null);
          setOpen(true);
        }}
        className="mb-4"
      >
        Add Clinic
      </Button>

      {useTable ? (
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
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedClinic(c);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(c.clinicID)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <ul className="space-y-2">
          {clinics.map((clinic) => (
            <li
              key={clinic.clinicID}
              className="border p-3 rounded flex justify-between items-center"
            >
              <div>
                <div className="font-semibold">{clinic.name}</div>
                <div className="text-sm text-gray-600">
                  {clinic.city}, {clinic.address} – {clinic.phoneNumber}
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="text-blue-600"
                  onClick={() => {
                    setSelectedClinic(clinic);
                    setOpen(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(clinic.clinicID)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <ClinicDialog
        open={open}
        setOpen={setOpen}
        refresh={refresh}
        clinic={selectedClinic}
      />
    </div>
  );
}
