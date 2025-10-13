"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addDoctor, updateDoctor, getDoctorById } from "@/library/doctorApi";
import type { Doctor, City, Clinic } from "@/pages/types/types";
import { getCities } from "@/library/cityApi";
import { getClinics } from "@/library/clinicApi";

export default function DoctorForm() {
  const { doctorId } = useParams<{ doctorId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Doctor, "doctorId">>({
    doctorName: "",
    careSpecialization: "",
    cityId: null,
    clinicId: null,
    status: "Active",
  });
  const [cities, setCities] = useState<City[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const idToEdit = doctorId ? parseInt(doctorId) : null;
  const isEdit = !!idToEdit;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cityData, clinicData] = await Promise.all([getCities(), getClinics()]);
        setCities(cityData);
        setClinics(clinicData);

        if (idToEdit) {
          const doctor = await getDoctorById(idToEdit);
          if (doctor) {
            setForm({
              doctorName: doctor.doctorName,
              careSpecialization: doctor.careSpecialization,
              cityId: doctor.cityId ?? null,
              clinicId: doctor.clinicId ?? null,
              status: doctor.status,
            });
          }
        }
      } catch (error) {
        console.error("Error loading data:", error);
        alert("Failed to load data");
      }
    };
    loadData();
  }, [idToEdit]);

  const handleSave = async () => {
    if (!form.doctorName.trim()) {
      alert("Doctor Name is required");
      return;
    }

    const payload = {
      doctorId: idToEdit ?? undefined,
      ...form,
    };

    try {
      if (isEdit && idToEdit) {
        await updateDoctor(idToEdit, payload);
        alert("Doctor updated successfully!");
      } else {
        await addDoctor(payload);
        alert("Doctor added successfully!");
      }
      navigate("/doctor-list");
    } catch (error) {
      console.error("Error saving doctor:", error);
      alert("Failed to save doctor");
    }
  };

  const handleCancel = () => {
    navigate("/doctor-list");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Edit Doctor" : "Add Doctor"}</h2>
      <div className="space-y-4">
        <div>
          <Label className="block mb-1 font-medium">Doctor Name</Label>
          <Input placeholder="Enter doctor name" value={form.doctorName} onChange={(e) => setForm({ ...form, doctorName: e.target.value })} />
        </div>
        <div>
          <Label className="block mb-1 font-medium">Specialization</Label>
          <Input
            placeholder="Enter specialization"
            value={form.careSpecialization}
            onChange={(e) => setForm({ ...form, careSpecialization: e.target.value })}
          />
        </div>
        <div>
          <Label className="block mb-1 font-medium">City</Label>
          <select
            className="border rounded-md w-full p-2"
            value={form.cityId?.toString() ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                cityId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId.toString()}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="block mb-1 font-medium">Clinic</Label>
          <select
            className="border rounded-md w-full p-2"
            value={form.clinicId?.toString() ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                clinicId: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          >
            <option value="">Select Clinic</option>
            {clinics
              .filter((clinic) => clinic.clinicId !== undefined)
              .map((clinic) => (
                <option key={clinic.clinicId} value={clinic.clinicId!.toString()}>
                  {clinic.clinicName}
                </option>
              ))}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="status"
            checked={form.status === "Active"}
            onCheckedChange={(checked) => setForm({ ...form, status: checked ? "Active" : "Inactive" })}
          />
          <Label htmlFor="status">Active</Label>
        </div>
        <div className="flex justify-end pt-4 space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button className="items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200" onClick={handleSave}>{isEdit ? "Update Doctor" : "Save Doctor"}</Button>
        </div>
      </div>
    </div>
  );
}
