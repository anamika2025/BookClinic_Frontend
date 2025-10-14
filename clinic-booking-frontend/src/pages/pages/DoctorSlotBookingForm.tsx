"use client";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoctors, getDoctorSlotById, addDoctorSlot, updateDoctorSlot } from "@/library/doctorApi";
import type { DoctorSlot, Doctor } from "@/pages/types/types";
import { Button } from "@/components/ui/button";

export default function DoctorSlotForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState<DoctorSlot>({
    slotId: 0,
    doctorId: 0,
    dayOfWeek: 0,
    fromTime: "09:00:00",
    toTime: "17:00:00",
  });

  // Load all active doctors
  const loadDoctors = useCallback(async () => {
    const data = await getDoctors();
    setDoctors(data.filter((d) => d.status === "Active"));
  }, []);

  // Load slot data if in edit mode
  const loadSlot = useCallback(
    async (id: number) => {
      try {
        const data = await getDoctorSlotById(+id);
        setFormData(data);
      } catch {
        alert("Failed to load slot");
        navigate("/doctor-slot-list");
      }
    },
    [navigate]
  );

  useEffect(() => {
    loadDoctors();
    if (isEditMode && id) loadSlot(+id);
  }, [id, isEditMode, loadSlot, loadDoctors]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (name === "dayOfWeek" || name === "doctorId") {
        return { ...prev, [name]: Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!formData.doctorId) {
      alert("Please select a doctor");
      return;
    }
    if (formData.fromTime >= formData.toTime) {
      alert("From time must be before to time");
      return;
    }

    try {
      if (isEditMode && id) {
        await updateDoctorSlot(+id, formData);
        alert("Doctor slot updated");
      } else {
        await addDoctorSlot(formData);
        alert("Doctor slot added");
      }
      navigate("/doctor-slot-list");
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to save slot");
      }
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? "Edit Doctor Slot" : "Add Doctor Slot"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Doctor Selection */}
        <div>
          <label className="block font-medium mb-1" htmlFor="doctorId">
            Doctor
          </label>
          <select
            id="doctorId"
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded p-2"
          >
            <option value="">Select Doctor</option>
            {doctors.map((d) => (
              <option key={d.doctorId} value={d.doctorId}>
                {d.doctorName}
              </option>
            ))}
          </select>
        </div>

        {/* Day of Week Selection */}
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

        {/* From Time Input */}
        <div>
          <label className="block font-medium mb-1" htmlFor="fromTime">
            From Time
          </label>
          <input
            type="time"
            id="fromTime"
            name="fromTime"
            value={formData.fromTime.slice(0, 5)}
            onChange={(e) => setFormData((prev) => ({ ...prev, fromTime: e.target.value + ":00" }))}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* To Time Input */}
        <div>
          <label className="block font-medium mb-1" htmlFor="toTime">
            To Time
          </label>
          <input
            type="time"
            id="toTime"
            name="toTime"
            value={formData.toTime.slice(0, 5)}
            onChange={(e) => setFormData((prev) => ({ ...prev, toTime: e.target.value + ":00" }))}
            required
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button type="submit">{isEditMode ? "Update" : "Add"}</Button>
          <Button type="button" variant="outline" onClick={() => navigate("/doctor-slot-list")}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
