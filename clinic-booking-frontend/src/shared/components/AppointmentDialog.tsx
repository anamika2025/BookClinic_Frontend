import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import type { SlotInfo } from "react-big-calendar";
import moment from "moment";


interface AppointmentDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  slot: SlotInfo | null;
  refresh: () => Promise<void>;
}

export default function AppointmentDialog({
  open,
  setOpen,
  slot,
  refresh,
}: AppointmentDialogProps) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Pre-fill date when a slot is selected
  useEffect(() => {
    if (slot) {
      setDate(moment(slot.start).format("YYYY-MM-DD"));
    }
  }, [slot]);

  const handleSave = () => {
    // TODO: Call API to save appointment
    console.log("Saving appointment:", { name, date, slot });

    refresh(); // reload calendar
    setOpen(false); // close dialog
    setName("");
    setDate("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Book Appointment</DialogTitle>
          <DialogDescription>
            Enter patient details for this slot.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
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
