"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import type { SlotInfo } from "react-big-calendar";
import { createAppointment, fetchDoctors, fetchClinics } from "@/library/appointmentsApi";
import type { Clinic, Doctor } from "@/pages/types/types";

interface AppointmentDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  slot: SlotInfo | null;
  refresh: () => Promise<void>;
  doctorId: number;
  clinicId: number;
}

export default function AppointmentDialog({ open, setOpen, slot, refresh }: AppointmentDialogProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [clinicId, setClinicId] = useState<number | "">("");
  const [doctorId, setDoctorId] = useState<number | "">("");
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // 🔹 Prefill with slot time or current time
  useEffect(() => {
    const formatDateLocal = (date: Date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    if (slot) {
      const start = new Date(slot.start);
      const end = new Date(slot.end);
      setDate(formatDateLocal(start)); // ✅ local date, not UTC
      setStartTime(start.toTimeString().slice(0, 5));
      setEndTime(end.toTimeString().slice(0, 5));
    } else {
      const now = new Date();
      const in30 = new Date(now.getTime() + 30 * 60000);
      setDate(formatDateLocal(now));
      setStartTime(now.toTimeString().slice(0, 5));
      setEndTime(in30.toTimeString().slice(0, 5));
    }
  }, [slot, open]);

  // 🔹 Load clinics & doctors
  useEffect(() => {
    const loadData = async () => {
      try {
        const clinicData = await fetchClinics();
        const doctorData = await fetchDoctors();
        setClinics(clinicData);
        setDoctors(doctorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    loadData();
  }, []);

  // 🔹 Handle Save
  const handleSave = async () => {
    if (!clinicId || !doctorId || !date || !startTime || !endTime || !name) {
      alert("Please fill in all required fields.");
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}`);
    if (startDateTime < new Date()) {
      alert("Cannot book an appointment in the past!");
      return;
    }

    try {
      const response = await createAppointment({
        doctorId: Number(doctorId),
        clinicId: Number(clinicId),
        startTime: `${date}T${startTime}`,
        endTime: `${date}T${endTime}`,
        userId: "user123",
        status: "Booked",
      });
      alert(response.message || "Appointment booked successfully!");

      await refresh();
      setOpen(false);

      // Reset form
      setName("");
      setDate("");
      setStartTime("");
      setEndTime("");
      setClinicId("");
      setDoctorId("");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        alert(err.message);
      } else {
        console.error("Unknown error", err);
        alert("An unexpected error occurred");
      }
    }
  };

  const filteredDoctors = clinicId ? doctors.filter((doc) => doc.clinicId === clinicId) : doctors;

  const today = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().slice(0, 5);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Enter appointment details below.</DialogDescription>
        </DialogHeader>

        {/* Clinic Dropdown */}
        <div className="space-y-2">
          <label htmlFor="clinic" className="font-medium">
            Clinic
          </label>
          <select
            id="clinic"
            value={clinicId}
            onChange={(e) => {
              const val = e.target.value;
              setClinicId(val === "" ? "" : Number(val));
              setDoctorId("");
            }}
            className="w-full border rounded p-2 bg-white text-black"
          >
            <option value="">Select clinic</option>
            {clinics.map((clinic, index) => (
              <option key={`${clinic.clinicId}-${index}`} value={clinic.clinicId}>
                {clinic.clinicName}
              </option>
            ))}
          </select>
        </div>

        {/* Doctor Dropdown */}
        <div className="space-y-2">
          <label htmlFor="doctor" className="font-medium">
            Doctor
          </label>
          <select
            id="doctor"
            value={doctorId}
            onChange={(e) => {
              const val = e.target.value;
              setDoctorId(val === "" ? "" : Number(val));
            }}
            className="w-full border rounded p-2 bg-white text-black"
          >
            <option value="">Select doctor</option>
            {filteredDoctors.map((doctor, index) => (
              <option key={`${doctor.doctorId}-${index}`} value={doctor.doctorId}>
                {doctor.doctorName}
              </option>
            ))}
          </select>
        </div>

        {/* Appointment Details */}
        <div className="space-y-4">
          <Input placeholder="Patient Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="date" value={date} min={today} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={startTime} min={date === today ? currentTime : undefined} onChange={(e) => setStartTime(e.target.value)} />
          <Input type="time" value={endTime} min={startTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!clinicId || !doctorId || !date || !startTime || !endTime || !name}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
