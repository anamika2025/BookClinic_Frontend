"use client";
import { useEffect, useState } from "react";
import { fetchCities, fetchClinics, fetchDoctors } from "@/library/api";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

export function Filters({ onChange }: { onChange: (filters: any) => void }) {
  const [cities, setCities] = useState<any[]>([]);
  const [clinics, setClinics] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);

  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedClinic, setSelectedClinic] = useState<string>();
  const [selectedDoctor, setSelectedDoctor] = useState<string>();

  useEffect(() => {
    fetchCities().then(setCities);
  }, []);

  useEffect(() => {
    if (selectedCity) fetchClinics(selectedCity).then(setClinics);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedClinic) fetchDoctors(selectedClinic).then(setDoctors);
  }, [selectedClinic]);

  useEffect(() => {
    onChange({ cityId: selectedCity, clinicId: selectedClinic, doctorId: selectedDoctor });
  }, [selectedCity, selectedClinic, selectedDoctor]);

  return (
    <div className="flex gap-4 mb-4">
      <Select onValueChange={setSelectedCity}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((c) => (
            <SelectItem key={c.CityID} value={c.CityID.toString()}>{c.CityName}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedClinic}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Clinic" />
        </SelectTrigger>
        <SelectContent>
          {clinics.map((cl) => (
            <SelectItem key={cl.ClinicID} value={cl.ClinicID}>{cl.ClinicName}</SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select onValueChange={setSelectedDoctor}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Doctor" />
        </SelectTrigger>
        <SelectContent>
          {doctors.map((d) => (
            <SelectItem key={d.DoctorID} value={d.DoctorID}>{d.DoctorName}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
