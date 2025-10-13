"use client";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getClinics, getClinicTimingById, addClinicTiming, updateClinicTiming } from "@/library/clinicApi";
import type { ClinicTiming, Clinic } from "@/pages/types/types";
import { Button } from "@/components/ui/button";

export default function ClinicTimingForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [formData, setFormData] = useState<ClinicTiming>({
    clinicTimingId: 0,
    clinicId: 0,
    dayOfWeek: 0,
    openingTime: "09:00:00",
    closingTime: "17:00:00",
  });

  const loadClinics = useCallback(async () => {
    const data = await getClinics();
    // Filter active clinics only
    setClinics(data.filter((c) => c.status === "Active"));
  }, []);

  const loadTiming = useCallback(
    async (id: number) => {
      try {
        const data = await getClinicTimingById(+id);
        setFormData(data);
      } catch {
        alert("Failed to load timing");
        navigate("/clinictiming-list");
      }
    },
    [navigate]
  );

  useEffect(() => {
    loadClinics();
    if (isEditMode && id) loadTiming(+id);
  }, [id, isEditMode, loadTiming, loadClinics]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (name === "dayOfWeek" || name === "clinicId") {
        return { ...prev, [name]: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.clinicId) {
      alert("Please select a clinic");
      return;
    }

    if (formData.openingTime >= formData.closingTime) {
      alert("Opening time must be before closing time");
      return;
    }

    try {
      if (isEditMode && id) {
        await updateClinicTiming(+id, formData);
        alert("Clinic timing updated");
      } else {
        await addClinicTiming(formData);
        alert("Clinic timing added");
      }
      navigate("/clinictiming-list");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to save timing");
      }
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Clinic Timing" : "Add Clinic Timing"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="clinicId">
            Clinic
          </label>
          <select
            id="clinicId"
            name="clinicId"
            value={formData.clinicId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select Clinic</option>
            {clinics.map((c) => (
              <option key={c.clinicId} value={c.clinicId}>
                {c.clinicName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="dayOfWeek">
            Day of Week
          </label>
          <select
            id="dayOfWeek"
            name="dayOfWeek"
            value={formData.dayOfWeek}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          >
            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, i) => (
              <option key={i} value={i}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="openingTime">
            Opening Time
          </label>
          <input
            type="time"
            id="openingTime"
            name="openingTime"
            value={formData.openingTime.slice(0, 5)} // "HH:mm"
            onChange={(e) => setFormData((prev) => ({ ...prev, openingTime: e.target.value + ":00" }))}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="closingTime">
            Closing Time
          </label>
          <input
            type="time"
            id="closingTime"
            name="closingTime"
            value={formData.closingTime.slice(0, 5)}
            onChange={(e) => setFormData((prev) => ({ ...prev, closingTime: e.target.value + ":00" }))}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        <div className="flex space-x-2">
          <Button type="submit">{isEditMode ? "Update" : "Add"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/clinictiming-list")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
