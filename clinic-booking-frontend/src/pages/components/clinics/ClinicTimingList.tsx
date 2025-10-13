"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getClinics , getClinicTimings, deleteClinicTiming} from "@/library/clinicApi";
import type { ClinicTiming, Clinic } from "@/pages/types/types";
import { Button } from "@/components/ui/button";

export default function ClinicTimingList() {
  const [timings, setTimings] = useState<ClinicTiming[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const [timingData, clinicData] = await Promise.all([
        getClinicTimings(),
        getClinics(),
      ]);
      setTimings(timingData);
      setClinics(clinicData);
    } catch (err) {
      alert("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const getClinicName = (clinicId: number) => {
    const clinic = clinics.find(c => c.clinicId === clinicId);
    return clinic ? clinic.clinicName : "-";
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this clinic timing?")) return;
    try {
      await deleteClinicTiming(id);
      await loadData();
    } catch (err) {
      alert("Failed to delete clinic timing");
      console.error(err);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold">Clinic Timings</h2>
        <Button onClick={() => navigate("/clinictiming-form")}>Add Timing</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Clinic</th>
              <th className="p-2 text-left">Day</th>
              <th className="p-2 text-left">Opening Time</th>
              <th className="p-2 text-left">Closing Time</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {timings.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-2 text-center">
                  No timings found.
                </td>
              </tr>
            ) : (
              timings.map(t => (
                <tr key={t.clinicTimingId}>
                  <td className="p-2">{getClinicName(t.clinicId)}</td>
                  <td className="p-2">{DayOfWeekToString(t.dayOfWeek)}</td>
                  <td className="p-2">{formatTimeSpan(t.openingTime)}</td>
                  <td className="p-2">{formatTimeSpan(t.closingTime)}</td>
                  <td className="p-2 space-x-2">
                    <Button variant="outline" onClick={() => navigate(`/clinic-timing-form/${t.clinicTimingId}`)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(t.clinicTimingId)}>
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

// Helpers to format

function DayOfWeekToString(day: number): string {
  // DayOfWeek enum: 0=Sunday ... 6=Saturday
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[day] || "";
}

function formatTimeSpan(time: string | number): string {
  // time comes as string "HH:mm:ss" or seconds number, depending on API
  // We'll assume ISO string "HH:mm:ss" from API. If not, adapt accordingly
  if (typeof time === "string") {
    // format "HH:mm:ss" to "HH:mm"
    return time.slice(0,5);
  }
  return "";
}
