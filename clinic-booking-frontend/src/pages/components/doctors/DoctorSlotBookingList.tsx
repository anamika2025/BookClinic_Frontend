"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, getDoctorSlots, deleteDoctorSlot } from "@/library/doctorApi";
import type { DoctorSlot, Doctor } from "@/pages/types/types";
import { Button } from "@/components/ui/button";

export default function DoctorSlotList() {
  const [slots, setSlots] = useState<DoctorSlot[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [slotData, doctorData] = await Promise.all([
        getDoctorSlots(),
        getDoctors(),
      ]);
      setSlots(slotData);
      setDoctors(doctorData);
    } catch (err) {
      alert("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getDoctorName = (doctorId: number) => {
    const doctor = doctors.find((d) => d.doctorId === doctorId);
    return doctor ? doctor.doctorName : "-";
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor slot?")) return;
    try {
      await deleteDoctorSlot(id);
      await loadData();
    } catch (err) {
      alert("Failed to delete doctor slot");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold">Doctor Slots</h2>
        <Button onClick={() => navigate("/doctor-slot-form")}>Add Slot</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Doctor</th>
              <th className="p-2 text-left">Day</th>
              <th className="p-2 text-left">From Time</th>
              <th className="p-2 text-left">To Time</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center">No slots found.</td>
              </tr>
            ) : (
              slots.map((s) => (
                <tr key={s.slotId}>
                  <td className="p-2">{getDoctorName(s.doctorId)}</td>
                  <td className="p-2">{dayOfWeekToString(s.dayOfWeek)}</td>
                  <td className="p-2">{formatTimeSpan(s.fromTime)}</td>
                  <td className="p-2">{formatTimeSpan(s.toTime)}</td>
                  <td className="p-2 space-x-2">
                    <Button variant="outline" onClick={() => navigate(`/doctor-slot-form/${s.slotId}`)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(s.slotId)}>
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

// Helper functions
function dayOfWeekToString(day: number): string {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day] || "";
}

function formatTimeSpan(time: string | number): string {
  if (typeof time === "string") {
    return time.slice(0, 5);
  }
  return "";
}
