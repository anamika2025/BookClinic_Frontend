"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createAppointment } from "@/library/api";

export function AppointmentDialog({ open, setOpen, slot, refresh }: any) {
  const [patientName, setPatientName] = useState("");

  const handleSave = async () => {
    if (!slot) return;
    await createAppointment({
      UserID: "current-user-id",
      ClinicID: "clinic-id",
      DoctorID: "doctor-id",
      AppointmentDate: slot.start.toISOString().split("T")[0],
      StartTime: slot.start.toTimeString().split(" ")[0],
      EndTime: slot.end.toTimeString().split(" ")[0],
      Status: "Booked"
    });
    refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="Patient Name" value={patientName} onChange={e => setPatientName(e.target.value)}/>
          <Button onClick={handleSave}>Confirm Booking</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
