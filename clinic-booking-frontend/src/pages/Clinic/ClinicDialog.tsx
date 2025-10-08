import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { addClinic, updateClinic } from "@/library/clinicApi";
import type { Clinic } from "@/types";

interface ClinicDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  refresh: () => void;
  clinic?: Clinic | null;
}

export default function ClinicDialog({
  open,
  setOpen,
  refresh,
  clinic,
}: ClinicDialogProps) {
  const [form, setForm] = useState<Omit<Clinic, "clinicID">>({
    name: "",
    city: "",
    address: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (clinic) {
      setForm({
        name: clinic.name,
        city: clinic.city,
        address: clinic.address,
        phoneNumber: clinic.phoneNumber,
      });
    } else {
      setForm({ name: "", city: "", address: "", phoneNumber: "" });
    }
  }, [clinic]);

  const handleSave = async () => {
    if (clinic) await updateClinic(clinic.clinicID, form);
    else await addClinic(form);
    refresh();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{clinic ? "Edit Clinic" : "Add Clinic"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
          <Input
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
          />
          <Button onClick={handleSave}>{clinic ? "Update" : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
