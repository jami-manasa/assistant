"use client";

import { ChangeEvent, useMemo, useState } from "react";
import {
  alerts,
  bookings as bookingSeed,
  customers as customerSeed,
  drivers as driverSeed,
  invoices,
  metrics,
  reports,
  suppliers as supplierSeed,
  vehicles as vehicleSeed,
} from "../../lib/mock-data";

const navItems = ["Overview", "Bookings", "Customers", "Suppliers", "Drivers", "Vehicles", "Invoices", "Reports", "Settings"] as const;

type NavItem = (typeof navItems)[number];
type BookingStatus = "Booked" | "In Transit" | "Completed" | "Pending Payment";
type CustomerRecord = { name: string; phone: string; balance: string; trips: number };
type SupplierRecord = { name: string; type: string; due: string };
type DriverRecord = { name: string; vehicle: string; status: string; payout: string };
type VehicleRecord = { number: string; type: string; revenue: string; maintenance: string };

async function parseSpreadsheet(file: File) {
  const XLSX = await import("xlsx");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json<Record<string, string | number>>(sheet, { defval: "" });
}

function normalizeMoney(value: string | number) {
  const stringValue = String(value).trim();
  if (!stringValue) return "";
  if (/^rs/i.test(stringValue)) return stringValue;
  return `Rs ${stringValue}`;
}

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState<NavItem>("Overview");
  const [bookings, setBookings] = useState(bookingSeed);
  const [customers, setCustomers] = useState<CustomerRecord[]>(customerSeed);
  const [suppliers, setSuppliers] = useState<SupplierRecord[]>(supplierSeed);
  const [drivers, setDrivers] = useState<DriverRecord[]>(driverSeed);
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(vehicleSeed);
  const [importMessage, setImportMessage] = useState("");

  const [bookingForm, setBookingForm] = useState({
    customer: "",
    route: "",
    amount: "",
    status: "Booked",
  });
  const [customerForm, setCustomerForm] = useState<CustomerRecord>({
    name: "",
    phone: "",
    balance: "",
    trips: 0,
  });
  const [supplierForm, setSupplierForm] = useState<SupplierRecord>({
    name: "",
    type: "",
    due: "",
  });
  const [driverForm, setDriverForm] = useState<DriverRecord>({
    name: "",
    vehicle: "",
    status: "",
    payout: "",
  });
  const [vehicleForm, setVehicleForm] = useState<VehicleRecord>({
    number: "",
    type: "",
    revenue: "",
    maintenance: "",
  });

  const bookingStatuses = useMemo(
    () => ["Booked", "In Transit", "Completed", "Pending Payment"] as BookingStatus[],
    []
  );

  function addBooking() {
    if (!bookingForm.customer || !bookingForm.route || !bookingForm.amount) return;

    setBookings((current) => [
      {
        id: `BK-${1042 + current.length + 1}`,
        customer: bookingForm.customer,
        route: bookingForm.route,
        amount: normalizeMoney(bookingForm.amount),
        status: bookingForm.status,
      },
      ...current,
    ]);

    setBookingForm({ customer: "", route: "", amount: "", status: "Booked" });
  }

  function updateBookingStatus(id: string, status: BookingStatus) {
    setBookings((current) => current.map((booking) => (booking.id === id ? { ...booking, status } : booking)));
  }

  function addCustomer() {
    if (!customerForm.name || !customerForm.phone) return;
    setCustomers((current) => [{ ...customerForm, balance: normalizeMoney(customerForm.balance), trips: Number(customerForm.trips) || 0 }, ...current]);
    setCustomerForm({ name: "", phone: "", balance: "", trips: 0 });
  }

  function addSupplier() {
    if (!supplierForm.name || !supplierForm.type) return;
    setSuppliers((current) => [{ ...supplierForm, due: normalizeMoney(supplierForm.due) }, ...current]);
    setSupplierForm({ name: "", type: "", due: "" });
  }

  function addDriver() {
    if (!driverForm.name || !driverForm.vehicle) return;
    setDrivers((current) => [{ ...driverForm, payout: normalizeMoney(driverForm.payout) }, ...current]);
    setDriverForm({ name: "", vehicle: "", status: "", payout: "" });
  }

  function addVehicle() {
    if (!vehicleForm.number || !vehicleForm.type) return;
    setVehicles((current) => [{ ...vehicleForm, revenue: normalizeMoney(vehicleForm.revenue) }, ...current]);
    setVehicleForm({ number: "", type: "", revenue: "", maintenance: "" });
  }

  async function importCustomers(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = await parseSpreadsheet(file);
    const imported = rows.map((row) => ({
      name: String(row.name ?? row.customer ?? ""),
      phone: String(row.phone ?? ""),
      balance: normalizeMoney(row.balance ?? row.outstanding ?? 0),
      trips: Number(row.trips ?? 0),
    })).filter((row) => row.name);
    setCustomers((current) => [...imported, ...current]);
    setImportMessage(`Imported ${imported.length} customer records.`);
    event.target.value = "";
  }

  async function importSuppliers(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = await parseSpreadsheet(file);
    const imported = rows.map((row) => ({
      name: String(row.name ?? row.supplier ?? ""),
      type: String(row.type ?? row.category ?? ""),
      due: normalizeMoney(row.due ?? row.balance ?? 0),
    })).filter((row) => row.name);
    setSuppliers((current) => [...imported, ...current]);
    setImportMessage(`Imported ${imported.length} supplier records.`);
    event.target.value = "";
  }

  async function importDrivers(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = await parseSpreadsheet(file);
    const imported = rows.map((row) => ({
      name: String(row.name ?? row.driver ?? ""),
      vehicle: String(row.vehicle ?? row.vehicleNumber ?? ""),
      status: String(row.status ?? "Available"),
      payout: normalizeMoney(row.payout ?? row.salary ?? 0),
    })).filter((row) => row.name);
    setDrivers((current) => [...imported, ...current]);
    setImportMessage(`Imported ${imported.length} driver records.`);
    event.target.value = "";
  }

  async function importVehicles(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const rows = await parseSpreadsheet(file);
    const imported = rows.map((row) => ({
      number: String(row.number ?? row.vehicle ?? row.vehicleNumber ?? ""),
      type: String(row.type ?? row.vehicleType ?? ""),
      revenue: normalizeMoney(row.revenue ?? 0),
      maintenance: String(row.maintenance ?? row.status ?? "Good"),
    })).filter((row) => row.number);
    setVehicles((current) => [...imported, ...current]);
    setImportMessage(`Imported ${imported.length} vehicle records.`);
    event.target.value = "";
  }

  function renderOverview() {
    return (
      <>
        <header className="panel">
          <p className="eyebrow">Dashboard</p>
          <h1 style={{ margin: 0, fontSize: "2rem" }}>Business overview</h1>
          <p className="muted">A startup-style command center for transport operations and financial control.</p>
        </header>

        <section className="top-grid">
          {metrics.map((metric) => (
            <article className="panel" key={metric.label}>
              <p className="eyebrow">{metric.label}</p>
              <div className="metric-value">{metric.value}</div>
              <div className="muted">{metric.hint}</div>
            </article>
          ))}
        </section>

        <section className="bottom-grid">
          <article className="table-card">
            <p className="eyebrow">Recent Bookings</p>
            <h2>Trip and collection status</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Booking</th>
                  <th>Customer</th>
                  <th>Route</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.customer}</td>
                    <td>{booking.route}</td>
                    <td>{booking.amount}</td>
                    <td>
                      <span className={`badge ${booking.status === "Completed" ? "success" : booking.status === "Pending Payment" ? "danger" : ""}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <article className="list-card">
            <p className="eyebrow">Alerts</p>
            <h2>Action center</h2>
            <div className="list">
              {alerts.map((alert) => (
                <div className="list-item" key={alert}>
                  {alert}
                </div>
              ))}
            </div>
          </article>
        </section>
      </>
    );
  }

  function renderBookings() {
    return (
      <section className="module-grid">
        <article className="panel">
          <p className="eyebrow">Create Booking</p>
          <h2>New trip booking</h2>
          <div className="stack">
            <label className="field">
              <span>Customer</span>
              <input value={bookingForm.customer} onChange={(event) => setBookingForm((current) => ({ ...current, customer: event.target.value }))} placeholder="Customer name" />
            </label>
            <label className="field">
              <span>Route</span>
              <input value={bookingForm.route} onChange={(event) => setBookingForm((current) => ({ ...current, route: event.target.value }))} placeholder="Hyderabad -> Pune" />
            </label>
            <label className="field">
              <span>Amount</span>
              <input value={bookingForm.amount} onChange={(event) => setBookingForm((current) => ({ ...current, amount: event.target.value }))} placeholder="38000" />
            </label>
            <label className="field">
              <span>Status</span>
              <select value={bookingForm.status} onChange={(event) => setBookingForm((current) => ({ ...current, status: event.target.value as BookingStatus }))}>
                {bookingStatuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </label>
            <button className="primary" type="button" onClick={addBooking}>
              Add Booking
            </button>
          </div>
        </article>

        <article className="table-card">
          <p className="eyebrow">Bookings</p>
          <h2>Trip lifecycle</h2>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Route</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.customer}</td>
                  <td>{booking.route}</td>
                  <td>{booking.amount}</td>
                  <td>
                    <select value={booking.status} onChange={(event) => updateBookingStatus(booking.id, event.target.value as BookingStatus)}>
                      {bookingStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    );
  }

  function renderEntitySection<T extends Record<string, string | number>>(
    title: string,
    subtitle: string,
    headers: string[],
    rows: string[][],
    form: T,
    setForm: React.Dispatch<React.SetStateAction<T>>,
    fields: { key: keyof T; label: string; placeholder: string; type?: "text" | "number" }[],
    addHandler: () => void,
    importHandler?: (event: ChangeEvent<HTMLInputElement>) => Promise<void>
  ) {
    return (
      <section className="module-grid">
        <article className="panel">
          <p className="eyebrow">{title}</p>
          <h2>Add new record</h2>
          <div className="stack">
            {fields.map((field) => (
              <label className="field" key={String(field.key)}>
                <span>{field.label}</span>
                <input
                  type={field.type ?? "text"}
                  value={String(form[field.key] ?? "")}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      [field.key]:
                        field.type === "number" ? Number(event.target.value || 0) : event.target.value,
                    }))
                  }
                  placeholder={field.placeholder}
                />
              </label>
            ))}
            <div className="action-row">
              <button className="primary" type="button" onClick={addHandler}>
                Add {title}
              </button>
              {importHandler ? (
                <label className="secondary upload-button">
                  Import Excel
                  <input type="file" accept=".xlsx,.xls,.csv" onChange={importHandler} hidden />
                </label>
              ) : null}
            </div>
            {importMessage ? <p className="muted">{importMessage}</p> : null}
          </div>
        </article>

        <article className="table-card">
          <p className="eyebrow">{title}</p>
          <h2>{subtitle}</h2>
          <table className="table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${title}-${index}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </article>
      </section>
    );
  }

  function renderSection() {
    switch (activeSection) {
      case "Overview":
        return renderOverview();
      case "Bookings":
        return renderBookings();
      case "Customers":
        return renderEntitySection(
          "Customers",
          "Customer ledger view",
          ["Name", "Phone", "Balance", "Trips"],
          customers.map((item) => [item.name, item.phone, item.balance, String(item.trips)]),
          customerForm,
          setCustomerForm,
          [
            { key: "name", label: "Customer Name", placeholder: "Sai Logistics" },
            { key: "phone", label: "Phone", placeholder: "+91 98480 11223" },
            { key: "balance", label: "Balance", placeholder: "110000" },
            { key: "trips", label: "Trips", placeholder: "18", type: "number" },
          ],
          addCustomer,
          importCustomers
        );
      case "Suppliers":
        return renderEntitySection(
          "Suppliers",
          "Supplier payable view",
          ["Name", "Type", "Due"],
          suppliers.map((item) => [item.name, item.type, item.due]),
          supplierForm,
          setSupplierForm,
          [
            { key: "name", label: "Supplier Name", placeholder: "KVR Fleet Provider" },
            { key: "type", label: "Type", placeholder: "Truck Provider" },
            { key: "due", label: "Due Amount", placeholder: "76000" },
          ],
          addSupplier,
          importSuppliers
        );
      case "Drivers":
        return renderEntitySection(
          "Drivers",
          "Driver operations",
          ["Name", "Vehicle", "Status", "Payout"],
          drivers.map((item) => [item.name, item.vehicle, item.status, item.payout]),
          driverForm,
          setDriverForm,
          [
            { key: "name", label: "Driver Name", placeholder: "Raju" },
            { key: "vehicle", label: "Vehicle", placeholder: "TS09AB2211" },
            { key: "status", label: "Status", placeholder: "Available" },
            { key: "payout", label: "Payout", placeholder: "18000" },
          ],
          addDriver,
          importDrivers
        );
      case "Vehicles":
        return renderEntitySection(
          "Vehicles",
          "Fleet management",
          ["Vehicle", "Type", "Revenue", "Maintenance"],
          vehicles.map((item) => [item.number, item.type, item.revenue, item.maintenance]),
          vehicleForm,
          setVehicleForm,
          [
            { key: "number", label: "Vehicle Number", placeholder: "TS09AB2211" },
            { key: "type", label: "Type", placeholder: "Trailer" },
            { key: "revenue", label: "Revenue", placeholder: "385000" },
            { key: "maintenance", label: "Maintenance", placeholder: "Due in 4 days" },
          ],
          addVehicle,
          importVehicles
        );
      case "Invoices":
        return (
          <article className="table-card">
            <p className="eyebrow">Invoices</p>
            <h2>Billing center</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Invoice</th>
                  <th>Party</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.party}</td>
                    <td>{item.kind}</td>
                    <td>{item.amount}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
        );
      case "Reports":
        return (
          <section className="report-grid">
            {reports.map((report) => (
              <article className="panel" key={report.title}>
                <p className="eyebrow">Report</p>
                <h2>{report.title}</h2>
                <p className="muted">{report.summary}</p>
                <button className="secondary" type="button">
                  Generate Report
                </button>
              </article>
            ))}
          </section>
        );
      case "Settings":
        return (
          <article className="panel settings-card">
            <p className="eyebrow">Settings</p>
            <h2>System preferences</h2>
            <div className="stack">
              <label className="field">
                <span>Currency</span>
                <select defaultValue="INR">
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </label>
              <label className="field">
                <span>Financial Year</span>
                <select defaultValue="2026-27">
                  <option value="2026-27">2026-27</option>
                  <option value="2025-26">2025-26</option>
                </select>
              </label>
              <label className="field">
                <span>Default Tax</span>
                <input defaultValue="18%" />
              </label>
              <button className="primary" type="button">
                Save Settings
              </button>
            </div>
          </article>
        );
    }
  }

  return (
    <main className="dashboard-shell">
      <aside className="sidebar">
        <p className="eyebrow">Unlitimate Transpo</p>
        <h2>Operations Hub</h2>
        <p className="muted">Monitor bookings, fleet, finance, and compliance from one secure workspace.</p>
        <nav>
          {navItems.map((item) => (
            <button key={item} className={`nav-item nav-button ${activeSection === item ? "active" : ""}`} type="button" onClick={() => setActiveSection(item)}>
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <section className="content">{renderSection()}</section>
    </main>
  );
}
