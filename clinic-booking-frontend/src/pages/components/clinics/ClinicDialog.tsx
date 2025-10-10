// src/components/clinics/ClinicDialog.tsx

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addClinic, updateClinic } from "@/library/clinicApi";
import type { Clinic } from "@/pages/types/types";

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
  const [form, setForm] = useState<Omit<Clinic, "clinicId">>({
    clinicName: "",
    clinicAddress: "",
    cityId: 0,
    stateId: 0,
    contactNumber: "",
    status: "Active",
  });

  useEffect(() => {
    if (clinic) {
      setForm({
        clinicName: clinic.clinicName,
        clinicAddress: clinic.clinicAddress,
        cityId: clinic.cityId,
        stateId: clinic.stateId,
        contactNumber: clinic.contactNumber,
        status: clinic.status,
      });
    } else {
      setForm({
        clinicName: "",
        clinicAddress: "",
        cityId: 0,
        stateId: 0,
        contactNumber: "",
        status: "Active",
      });
    }
  }, [clinic]);

  const handleSave = async () => {
    if (clinic) {
      await updateClinic(clinic.clinicId, form);
    } else {
      await addClinic(form);
    }
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
            placeholder="Clinic Name"
            value={form.clinicName}
            onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
          />
          <Input
            placeholder="Address"
            value={form.clinicAddress}
            onChange={(e) => setForm({ ...form, clinicAddress: e.target.value })}
          />
          <Input
            placeholder="City ID"
            type="number"
            value={form.cityId}
            onChange={(e) => setForm({ ...form, cityId: parseInt(e.target.value) })}
          />
          <Input
            placeholder="State ID"
            type="number"
            value={form.stateId}
            onChange={(e) => setForm({ ...form, stateId: parseInt(e.target.value) })}
          />
          <Input
            placeholder="Contact Number"
            value={form.contactNumber}
            onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
          />
          <Input
            placeholder="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
          <Button onClick={handleSave}>{clinic ? "Update" : "Save"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
