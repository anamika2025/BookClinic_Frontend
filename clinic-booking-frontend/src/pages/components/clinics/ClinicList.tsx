"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClinics, deleteClinic } from "@/library/clinicApi";
import { Button } from "@/components/ui/button";
import type { Clinic } from "@/pages/types/types";

export default function ClinicList() {
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const navigate = useNavigate();

  const loadClinics = async () => {
    try {
      const data = await getClinics();
      setClinics(data);
    } catch (error) {
      console.error("Error loading clinics:", error);
      alert("Failed to load clinics");
    }
  };

  useEffect(() => {
    loadClinics();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this clinic?")) return;
    try {
      await deleteClinic(id);
      loadClinics();
    } catch (error) {
      console.error("Error deleting clinic:", error);
      alert("Failed to delete clinic");
    }
  };

  const handleEdit = (clinicId: number) => {
    navigate(`/clinic-form/${clinicId}`);
  };

  const handleAdd = () => {
    navigate("/clinic-form");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold">Clinics</h2>
        <Button onClick={handleAdd} className="items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
          Add Clinic
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">City</th>
              <th className="p-2 text-left">Contact</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clinics.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center">
                  No clinics found.
                </td>
              </tr>
            ) : (
              clinics.map((clinic) => (
                <tr key={clinic.clinicId} className="border-t hover:bg-gray-50">
                  <td className="p-2">{clinic.clinicName}</td>
                  <td className="p-2">{clinic.cityId}</td>
                  <td className="p-2">{clinic.contactNumber}</td>
                  <td className="p-2">{clinic.status}</td>
                  <td className="p-2 space-x-2">
                    <Button variant="outline" onClick={() => handleEdit(clinic.clinicId!)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(clinic.clinicId!)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
