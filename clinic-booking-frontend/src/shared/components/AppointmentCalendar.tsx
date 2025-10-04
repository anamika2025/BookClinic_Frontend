"use client";
import { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { fetchAppointments } from "@/library/api";
import AppointmentDialog from "@/shared/components/AppointmentDialog";

const localizer = momentLocalizer(moment);

interface AppointmentCalendarProps {
  filters: {
    city?: string;
    // Add other filter fields here
  };
}


 const AppointmentCalendar = ({ filters }: AppointmentCalendarProps) => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [slot, setSlot] = useState<SlotInfo | null>(null);
  const [open, setOpen] = useState(false);

  const loadAppointments = async () => {
    const data = await fetchAppointments(filters);
    const mapped = data.map((a: any) => ({
      id: a.AppointmentID,
      title: `${a.Status} - Dr.${a.DoctorName}`,
      start: new Date(`${a.AppointmentDate}T${a.StartTime}`),
      end: new Date(`${a.AppointmentDate}T${a.EndTime}`),
      status: a.Status,
    }));
    setAppointments(mapped);
  };

  useEffect(() => {
    loadAppointments();
  }, [filters]);

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={appointments}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        selectable
        onSelectSlot={(slot) => {
          setSlot(slot);
          setOpen(true);
        }}
        eventPropGetter={(event) => {
          let bg = "#3b82f6";
          if (event.status === "Completed") bg = "#22c55e";
          if (event.status === "Cancelled") bg = "#ef4444";
          return { style: { backgroundColor: bg, color: "white" } };
        }}
      />

      <AppointmentDialog
        open={open}
        setOpen={setOpen}
        slot={slot}
        refresh={loadAppointments}
      />
    </div>
  );
}

export default AppointmentCalendar;
