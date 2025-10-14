"use client";

import { useEffect, useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import type { SlotInfo } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { fetchAppointments } from "@/library/appointmentsApi";
import AppointmentDialog from "@/shared/components/AppointmentDialog";
import type { AppointmentResponse } from "@/pages/types/types";

const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  status: string;
}

interface AppointmentCalendarProps {
  filters: {
    city?: string;
    clinicId: number;
    doctorId: number;
  };
}

const AppointmentCalendar = ({ filters }: AppointmentCalendarProps) => {
  const [appointments, setAppointments] = useState<CalendarEvent[]>([]);
  const [slot, setSlot] = useState<SlotInfo | null>(null);
  const [open, setOpen] = useState(false);

  const loadAppointments = useCallback(async () => {
    if (!filters.clinicId || !filters.doctorId) return;

    const data: AppointmentResponse[] = await fetchAppointments({
      clinicId: filters.clinicId,
      doctorId: filters.doctorId,
    });

    const mapped: CalendarEvent[] = data.map((a) => ({
      id: a.appointmentId,
      title: `${a.status} - Dr. ${a.doctorName}`,
      start: new Date(`${a.appointmentDate}T${a.startTime}`),
      end: new Date(`${a.appointmentDate}T${a.endTime}`),
      status: a.status,
    }));

    setAppointments(mapped);
  }, [filters]);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

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
        doctorId={filters.doctorId}
        clinicId={filters.clinicId}
      />
    </div>
  );
};

export default AppointmentCalendar;
