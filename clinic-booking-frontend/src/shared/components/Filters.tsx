"use client";
import { useEffect, useState } from "react";
import { fetchCities, fetchClinics, fetchDoctors } from "@/library/api";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { Doctor, Clinic, City } from "@/pages/types/types";

interface FiltersProps {
  onChange: (filters: { cityId?: string; clinicId?: string; doctorId?: string }) => void;
}

export function Filters({ onChange }: FiltersProps) {
  const [cities, setCities] = useState<City[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedClinic, setSelectedClinic] = useState<string>();
  const [selectedDoctor, setSelectedDoctor] = useState<string>();

  useEffect(() => {
    fetchCities().then(setCities).catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedCity) {
      fetchClinics(selectedCity).then(setClinics).catch(console.error);
    } else {
      setClinics([]);
      setSelectedClinic(undefined);
      setSelectedDoctor(undefined);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedClinic) {
      fetchDoctors(selectedClinic).then(setDoctors).catch(console.error);
    } else {
      setDoctors([]);
      setSelectedDoctor(undefined);
    }
  }, [selectedClinic]);

  useEffect(() => {
    onChange({
      cityId: selectedCity,
      clinicId: selectedClinic,
      doctorId: selectedDoctor,
    });
  }, [selectedCity, selectedClinic, selectedDoctor, onChange]);

  return (
    <div className="flex gap-4 mb-4">
      {/* City Select */}
      <Select value={selectedCity} onValueChange={setSelectedCity}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select City" />
        </SelectTrigger>
        <SelectContent>
          {cities.map((city) => (
            <SelectItem key={city.cityId} value={city.cityId.toString()}>
              {city.cityName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Clinic Select */}
      <Select value={selectedClinic} onValueChange={setSelectedClinic} disabled={!selectedCity}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Clinic" />
        </SelectTrigger>
        <SelectContent>
          {clinics.map((clinic) => (
            <SelectItem key={clinic.clinicId} value={clinic.clinicName.toString()}>
              {clinic.clinicName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Doctor Select */}
      <Select value={selectedDoctor} onValueChange={setSelectedDoctor} disabled={!selectedClinic}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select Doctor" />
        </SelectTrigger>
        <SelectContent>
          {doctors.map((doctor) => (
            <SelectItem key={doctor.doctorId} value={doctor.doctorName.toString()}>
              {doctor.doctorName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
