"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEffect, useState } from "react";
import type { SlotInfo } from "react-big-calendar";
import { createAppointment } from "@/library/appointmentsApi";
import { fetchDoctors, fetchClinics } from "@/library/appointmentsApi";
import type { Clinic, Doctor } from "@/types";

interface AppointmentDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  slot: SlotInfo | null;
  refresh: () => Promise<void>;
  doctorId: number;
  clinicId: number;
}

export default function AppointmentDialog({ open, setOpen, refresh, doctorId, clinicId }: AppointmentDialogProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);

  // Pre-fill date & time when a slot is selected
  useEffect(() => {
    const loadData = async () => {
      try {
        const [doctorsRes, clinicsRes] = await Promise.all([fetchDoctors(), fetchClinics()]);
        setDoctors(doctorsRes);
        setClinics(clinicsRes);
      } catch (error) {
        console.error("Failed to fetch doctors/clinics:", error);
      }
    };

    loadData();
  }, []);

  const handleSave = async () => {
    try {
      await createAppointment({
        doctorId,
        clinicId,
        startTime: `${date}T${startTime}`,
        endTime: `${date}T${endTime}`,
        userId: "user123", // Replace with actual user ID from auth
        status: "Booked",
      });

      await refresh(); // reload calendar
      setOpen(false); // close dialog

      // reset fields
      setName("");
      setDate("");
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.error("Failed to create appointment:", err);
      alert("Could not book the appointment.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>Enter patient details for this time slot.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <label htmlFor="clinic">Clinic</label>
          <select id="clinic" value={clinicId} onChange={(e) => setClinicId(Number(e.target.value))} className="w-full border rounded p-2">
            <option value="">Select clinic</option>
            {clinics.map((clinic) => (
              <option key={clinic.clinicID} value={clinic.clinicID}>
                {clinic.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <div className="space-y-2">
            <label htmlFor="doctor">Doctor</label>
            <select id="doctor" value={doctorId} onChange={(e) => setDoctorId(Number(e.target.value))} className="w-full border rounded p-2">
              <option value="">Select doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <Input placeholder="Patient Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          <Input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
