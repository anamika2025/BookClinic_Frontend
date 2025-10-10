"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addClinic, updateClinic } from "@/library/clinicApi";
import { getCities } from "@/library/cityApi";
import type { Clinic, City, ClinicFormProps } from "@/pages/types/types";

export default function ClinicForm({ clinic, onClose }: ClinicFormProps) {
  const [form, setForm] = useState<Omit<Clinic, "clinicId">>({
    clinicName: "",
    clinicAddress: "",
    cityId: 0,
    stateId: 0,
    contactNumber: 0,
    status: "Active",
  });
  const [cities, setCities] = useState<City[]>([]);
  const [isEdit, setIsEdit] = useState(!!clinic);

  useEffect(() => {
    loadCities();
    if (clinic) {
      setForm({
        clinicName: clinic.clinicName,
        clinicAddress: clinic.clinicAddress,
        cityId: clinic.cityId,
        stateId: clinic.stateId,
        contactNumber: clinic.contactNumber,
        status: clinic.status,
      });
    }
  }, [clinic]);

  const loadCities = async () => {
    try {
      const data = await getCities();
      setCities(data);
    } catch (error) {
      console.error("Error loading cities:", error);
    }
  };

  const handleSave = async () => {
    if (!form.clinicName.trim()) {
      alert("Clinic Name is required");
      return;
    }
    try {
      if (isEdit && clinic?.clinicId) {
        await updateClinic(clinic.clinicId, form);
        alert("Clinic updated successfully!");
      } else {
        await addClinic(form);
        alert("Clinic added successfully!");
      }
      setForm({
        clinicName: "",
        clinicAddress: "",
        cityId: 0,
        stateId: 0,
        contactNumber: 0,
        status: "Active",
      });
      setIsEdit(false);
      if (onClose) onClose();
    } catch (error) {
      console.error("Error saving clinic:", error);
      alert("Failed to save clinic");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{isEdit ? "Edit Clinic" : "Add Clinic"}</h2>
      <div className="space-y-4">
        <div>
          <Label className="block mb-1 font-medium">Clinic Name</Label>
          <Input placeholder="Enter clinic name" value={form.clinicName} onChange={(e) => setForm({ ...form, clinicName: e.target.value })} />
        </div>
        <div>
          <Label className="block mb-1 font-medium">Clinic Address</Label>
          <Input placeholder="Enter address" value={form.clinicAddress} onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })} />
        </div>
        <div>
          <Label className="block mb-1 font-medium">City</Label>
          <select
            className="border rounded-md w-full p-2"
            value={form.cityId}
            onChange={(e) => setForm({ ...form, cityId: parseInt(e.target.value) })}
          >
            <option value={0}>Select City</option>
            {cities.map((city) => (
              <option key={city.cityId} value={city.cityId}>
                {city.cityName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label className="block mb-1 font-medium">Contact Number</Label>
          <Input
            type="tel"
            pattern="[0-9]*"
            placeholder="Enter contact number"
            value={form.contactNumber}
            onChange={(e) => setForm({ ...form, contactNumber: Number(e.target.value) })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms">Status</Label>
        </div>
        <div className="flex justify-end pt-4">
          <Button onClick={handleSave}>{isEdit ? "Update Clinic" : "Save Clinic"}</Button>
        </div>
      </div>
    </div>
  );
}
