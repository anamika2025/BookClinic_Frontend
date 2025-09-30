import MainLayout from '@/shared/layouts/MainLayout'
import DatePickerAndTimeRangePicker from '@/shared/components/DatePickerAndTimeRangePicker'

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Clinic Appointment Booking</h1>
      <DatePickerAndTimeRangePicker />
      {/* You can add more components here: AppointmentList, ClinicCards, etc. */}
    </MainLayout>
  )
}
