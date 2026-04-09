export type UserRole = "admin" | "operations" | "accounts" | "dispatch";

export interface DashboardMetric {
  label: string;
  value: number | string;
  unit?: string;
}

export interface BookingRecord {
  id: string;
  customerName: string;
  vehicleNumber: string;
  driverName: string;
  pickupLocation: string;
  dropLocation: string;
  bookingAmount: number;
  status: "booked" | "in_transit" | "completed" | "cancelled";
}
