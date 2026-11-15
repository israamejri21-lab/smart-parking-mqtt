# SmartPark – Real-Time Smart Parking Dashboard

**SmartPark** is an IoT-based Smart Parking Management System designed to monitor parking spaces and visualize occupancy availability in real time.

This phase implements the **Frontend Dashboard and Interactive Parking Visualization**, architected to seamlessly integrate with an MQTT broker in the subsequent phase.

---

## 🎨 Visual Identity & UI/UX

- **Design Style**: Futuristic Dark IoT Telemetry Dashboard
- **Color Palette**:
  - Main Background: Deep Navy (`#0B1020`)
  - Sidebar: Dark Navy (`#10152B`)
  - Cards & Panels: Slightly lighter Navy (`#171D38`)
  - Primary Accent: Cyber Purple (`#7655F5`)
  - Available Spaces: Green (`#22C55E`)
  - Occupied Spaces: Red (`#EF4444`)
  - Out-of-Service Spaces: Gray (`#64748B`)

---

## 🚀 Key Features

1. **Fixed / Collapsible Sidebar**
   - Brand logo & SmartPark name
   - Navigation: Dashboard, Parking Overview, Statistics, Notifications, Settings
   - Responsive drawer for mobile and tablet devices
   - Broker readiness indicator

2. **Real-Time Header**
   - Live ticking NTP clock with date & time
   - Pulsing green "Live Monitoring" status beacon
   - Toggle button for the **Auto-Simulation Engine** (enable/pause live random events)
   - Notification dropdown displaying recent telemetry alerts
   - Operator profile menu

3. **Dynamic Statistics Cards**
   - **Total Parking Spaces** (20 bays)
   - **Available Spaces** (dynamically counted, with green indicator & occupancy share)
   - **Occupied Spaces** (dynamically counted, with red indicator & occupancy share)
   - **Out of Service Spaces** (dynamically counted, with gray indicator)
   - **Overall Occupancy Rate**: dynamically calculated as `(occupied / total) * 100`

4. **Interactive 20-Bay Parking Facility**
   - **Row A**: Bays 01 to 10 (North Row)
   - **Central Driving Lane**: Asphalt road styling, one-way directional indicators, speed limit markings
   - **Row B**: Bays 11 to 20 (South Row)
   - Bays display vehicle license plates, ultrasonic distance readings, and car iconography when occupied
   - Live filtering by status: *All*, *Free*, *Occupied*, *Offline*

5. **Parking Details & Administrative Simulation Modal**
   - Click on any bay to inspect:
     - Space ID, floor, zone, and current status
     - Ultrasonic sensor ID, battery percentage, signal strength (RSSI), and distance reading
     - Simulated MQTT topic (`parking/spot/{id}/status`) and payload preview
   - **Administrative Controls**: Override status with a single click (*Set Free*, *Set Occupied*, *Set Offline*)
   - Instant synchronization across all statistics, maps, charts, and activity feeds

6. **24-Hour Occupancy Trend Chart (Recharts)**
   - Area chart showing historical 24-hour occupancy rates with custom purple gradient fill
   - Interactive tooltip on hover showing exact bay usage
   - Peak occupancy and 24h average calculations

7. **Recent Activity Stream**
   - Real-time rolling log of the last 10 parking events
   - Clear status icons, bay numbers, and timestamps
   - Click on any event to immediately inspect that bay

8. **Simulated Real-Time Updates**
   - Automatic background interval (every 12 seconds) triggers status changes to random bays
   - Clean `useEffect` interval cleanup to prevent memory leaks
   - Manual event trigger button to test state changes instantly

9. **MQTT-Ready Architecture**
   - State is isolated in `src/hooks/useParking.tsx`
   - Inbound MQTT payload handler `handleMqttMessage({ spotId, status, timestamp })` is pre-wired to consume future MQTT.js broker messages without touching any UI component

---

## 📁 Project Architecture

```
src/
├── app/
│   ├── globals.css              # Custom styling, scrollbars & color tokens
│   ├── layout.tsx               # Root layout & dark mode shell
│   └── page.tsx                 # Main SmartPark dashboard page
├── components/
│   └── dashboard/
│       ├── Header.tsx           # Top navigation bar with live clock & status
│       ├── OccupancyChart.tsx   # Recharts 24h occupancy trend chart
│       ├── ParkingDetailsModal.tsx # Bay inspection modal & admin controls
│       ├── ParkingMap.tsx       # 20-bay parking lot layout with driving lane
│       ├── ParkingSpot.tsx      # Individual bay slot component
│       ├── RecentActivity.tsx   # Latest 10 telemetry events feed
│       ├── Sidebar.tsx          # Collapsible responsive sidebar
│       └── StatCard.tsx         # Metric cards with dynamic progress bars
├── data/
│   └── parkingData.ts           # Initial 20 bays, 24h history, and activities
├── hooks/
│   └── useParking.tsx           # Shared React state, simulation & MQTT hook
└── types/
    └── parking.ts               # TypeScript interfaces & types
```

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Start Production Server
```bash
npm start
```
