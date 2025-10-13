"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDoctors, deleteDoctor } from "@/library/doctorApi"; // Assuming you add getClinics and getCities here
import { Button } from "@/components/ui/button";
import type { Doctor, Clinic, City } from "@/pages/types/types";
import { getCities } from "@/library/cityApi";
import { getClinics } from "@/library/clinicApi";

export default function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const navigate = useNavigate();

  // Load all data
  const loadData = async () => {
    try {
      const [doctorsData, clinicsData, citiesData] = await Promise.all([getDoctors(), getClinics(), getCities()]);
      setDoctors(doctorsData);
      setClinics(clinicsData);
      setCities(citiesData);
    } catch (error) {
      console.error("Error loading data:", error);
      alert("Failed to load data");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      await deleteDoctor(id);
      loadData();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      alert("Failed to delete doctor");
    }
  };

  const handleEdit = (doctorId: number) => {
    navigate(`/doctor-form/${doctorId}`);
  };

  const handleAdd = () => {
    navigate("/doctor-form");
  };

  // Helper to get city name by id
  const getCityName = (cityId: number | null) => {
    const city = cities.find((c) => c.cityId === cityId);
    return city ? city.cityName : "-";
  };

  // Helper to get clinic name by id
  const getClinicName = (clinicId: number | null) => {
    const clinic = clinics.find((c) => c.clinicId === clinicId);
    return clinic ? clinic.clinicName : "-";
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200">
        <h2 className="text-xl font-semibold">Doctors</h2>
        <Button className="items-center mb-4 bg-gray-50 p-3 rounded-md border border-gray-200" onClick={handleAdd}>
          Add Doctor
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Specialization</th>
              <th className="p-2 text-left">City</th>
              <th className="p-2 text-left">Clinic</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-2 text-center">
                  No doctors found.
                </td>
              </tr>
            ) : (
              doctors.map((doctor) => (
                <tr key={doctor.doctorId} className="border-t hover:bg-gray-50">
                  <td className="p-2">{doctor.doctorName}</td>
                  <td className="p-2">{doctor.careSpecialization}</td>
                  <td className="p-2">{getCityName(doctor.cityId)}</td>
                  <td className="p-2">{getClinicName(doctor.clinicId)}</td>
                  <td className="p-2">{doctor.status}</td>
                  <td className="p-2 space-x-2">
                    <Button variant="outline" onClick={() => handleEdit(doctor.doctorId!)}>
                      Edit
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(doctor.doctorId!)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
