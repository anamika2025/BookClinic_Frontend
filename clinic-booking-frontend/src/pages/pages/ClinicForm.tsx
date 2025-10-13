"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addClinic, updateClinic, getCities, getClinicById } from "@/library/clinicApi";
import type { Clinic, City } from "@/pages/types/types";

export default function ClinicForm() {
  const { clinicId } = useParams<{ clinicId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<Omit<Clinic, "clinicId">>({
    clinicName: "",
    clinicAddress: "",
    cityId: null,
    contactNumber: 0,
    status: "Active",
  });
  const [cities, setCities] = useState<City[]>([]);
  const idToEdit = clinicId ? parseInt(clinicId) : null;
  const isEdit = !!idToEdit;

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getCities();
        setCities(data);
        if (idToEdit) {
          const clinic = await getClinicById(idToEdit);
          if (clinic) {
            setForm({
              clinicName: clinic.clinicName,
              clinicAddress: clinic.clinicAddress,
              cityId: clinic.cityId ?? null,
              contactNumber: clinic.contactNumber ?? 0,
              status: clinic.status,
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
    if (!form.clinicName.trim()) {
      alert("Clinic Name is required");
      return;
    }
    try {
      const payload = {
        // ...form,
        clinicId: idToEdit ?? undefined,
        clinicName: form.clinicName,
        clinicAddress: form.clinicAddress,
        cityId: form.cityId,
        contactNumber: form.contactNumber ?? 0,
        status: form.status,
        // cityId: form.cityId ?? null,
      };
      console.log("Saving with ID:", idToEdit, payload);
      if (isEdit && idToEdit) {
        await updateClinic(idToEdit, payload);
        alert("Clinic updated successfully!");
      } else {
        await addClinic(payload);
        alert("Clinic added successfully!");
      }
      navigate("/clinic-list");
    } catch (error) {
      console.error("Error saving clinic:", error);
      alert("Failed to save clinic");
    }
  };

  const handleCancel = () => {
    navigate("/clinic-list");
  };

  return (
    <div className="p-6">
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
            value={form.cityId?.toString() ?? ""} // Convert to string or empty string
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
          <Label className="block mb-1 font-medium">Contact Number</Label>
          <Input
            type="tel"
            pattern="[0-9]*"
            placeholder="Enter contact number"
            value={form.contactNumber?.toString() ?? ""}
            onChange={(e) =>
              setForm({
                ...form,
                contactNumber: e.target.value ? parseInt(e.target.value) : null,
              })
            }
          />
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
          <Button className="items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200" onClick={handleSave}>
            {isEdit ? "Update Clinic" : "Save Clinic"}
          </Button>
        </div>
      </div>
    </div>
  );
}
