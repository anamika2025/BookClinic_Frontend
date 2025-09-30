import MainLayout from "../shared/layouts/MainLayout";
import DatePickerAndTimeRangePicker from "../shared/components/DatePickerAndTimeRangePicker";

export default function Home() {
  return (
    <MainLayout>
      <h1 className="text-xl font-bold mb-4">Welcome to Clinic Booking</h1>
      <DatePickerAndTimeRangePicker />
    </MainLayout>
  );
}
