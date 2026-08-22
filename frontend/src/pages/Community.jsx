Design and build a polished, modern, responsive **Admin Panel / Analytics Dashboard (Screen 12)** for the **GlobeTrotter** travel planning web application.

Use the **provided Admin Panel wireframe as the structural/base reference**. Preserve its major information hierarchy and functionality, but transform the rough wireframe into a **professional, production-ready admin dashboard** with complete UI, realistic data, interactive charts, tables, filters, navigation, and responsive behavior.

The Admin Panel should allow administrators to monitor the GlobeTrotter platform, manage users, understand popular destinations and activities, and analyze travel trends.

---

# 1. Product Context

GlobeTrotter is a personalized travel planning platform where users can:

* Create multi-city trips
* Add destinations and travel stops
* Add activities
* Build day-wise itineraries
* Track estimated expenses
* Share trips publicly
* Discover destinations
* Interact with the travel community

The Admin Panel provides administrators with a centralized view of:

* Users
* Trips
* Destinations
* Activities
* Travel trends
* Platform engagement
* Popular cities
* Popular activities
* User growth
* Trip creation trends

The admin experience should feel like a **modern SaaS analytics platform**, while still maintaining GlobeTrotter's travel identity.

---

# 2. Wireframe Structure

Use the uploaded wireframe as the structural reference.

Preserve these key elements:

**GlobeTrotter Header**

↓

**Search / Group By / Filter / Sort By**

↓

**Admin Navigation Tabs**

* Manage Users
* Popular Cities
* Popular Activities
* User Trends & Analytics

↓

**Main Analytics Dashboard**

with:

* User statistics
* Pie/donut chart
* User/trip trend line chart
* Popular activity bar chart
* Additional analytics

↓

**Right-side information/help panel**

The final design should NOT look like the wireframe.

Convert it into a polished dashboard with proper cards, spacing, typography, charts, tables, icons, filters, and responsive layouts.

---

# 3. Admin Navigation

Create a professional admin header.

### Left

GlobeTrotter logo:

**GlobeTrotter**

Add a small globe/travel icon.

### Admin indicator

Display:

**Admin Console**

or

**Admin Dashboard**

near the logo.

### Right

Include:

* Notification icon
* Help icon
* Admin avatar
* Admin name
* Dropdown arrow

Example:

**Admin · GlobeTrotter**

---

# 4. Admin Sidebar

Instead of relying only on the wireframe's horizontal buttons, create a modern compact admin navigation.

On desktop, use a left sidebar.

Navigation:

### Overview

Dashboard

### Management

Users
Trips
Destinations
Activities

### Analytics

Popular Cities
Popular Activities
User Trends
Trip Analytics

### System

Reports
Settings

At the bottom:

**Back to GlobeTrotter**

The sidebar should be collapsible.

Use icons from Lucide React.

Examples:

* LayoutDashboard
* Users
* Map
* Building2
* Activity
* BarChart3
* TrendingUp
* Settings
* LogOut

Highlight:

**Dashboard**

as the active item.

---

# 5. Mobile Navigation

On mobile:

* Hide the desktop sidebar
* Show a compact top navigation
* Add hamburger menu
* Open sidebar as a drawer

Ensure the admin interface remains fully usable on mobile and tablet.

---

# 6. Page Header

Main content should begin with:

### Admin Dashboard

**Monitor GlobeTrotter activity, users, trips, and travel trends.**

On the right:

**Export Report**

button

and optionally:

**Last 30 Days ▾**

date-range selector.

---

# 7. Global Search and Controls

Preserve the search/filter functionality from the wireframe.

Create a clean toolbar containing:

### Search

Placeholder:

**“Search users, trips, cities, activities…”**

with search icon.

### Group By

Options:

* User
* Destination
* Activity
* Trip
* Date

### Filter

Options:

* Active Users
* New Users
* Upcoming Trips
* Completed Trips
* Public Trips
* Private Trips

### Sort By

Options:

* Most Recent
* Most Popular
* Highest Activity
* Highest Trip Count

Add:

**Clear Filters**

when filters are active.

---

# 8. KPI Overview Cards

Replace the wireframe's generic chart placeholders with a professional analytics overview.

Create 4–5 KPI cards.

### Total Users

**24,580**

**+12.8%**

compared with previous month.

Icon:

Users

---

### Total Trips

**8,426**

**+8.4%**

Icon:

Map

---

### Active Trips

**2,184**

**+15.2%**

Icon:

Navigation

---

### Destinations Explored

**1,284**

**+6.7%**

Icon:

Globe

---

### Community Posts

**5,892**

**+18.3%**

Icon:

MessageCircle

Use small trend indicators.

Example:

**↑ 12.8%**

Do not make all KPI cards visually identical. Use subtle icon backgrounds and clear hierarchy.

---

# 9. Main Analytics Overview

Create a large analytics section.

### User & Trip Growth

Display a responsive line/area chart.

Chart controls:

**Users | Trips | Community**

Time range:

**7 Days | 30 Days | 3 Months | 1 Year**

Example chart data:

Jan 1 → Jan 31

Users:

12K → 24.5K

Trips:

4K → 8.4K

Show tooltip when hovering over chart points.

Use a clean chart design with minimal grid lines.

---

# 10. User Distribution Chart

Create a modern donut chart.

Title:

**User Distribution**

Categories:

* Active Users
* New Users
* Returning Users
* Inactive Users

Example:

Active:

62%

New:

18%

Returning:

14%

Inactive:

6%

Place a legend beside or below the chart.

The chart should visually correspond to the pie-chart concept shown in the wireframe.

---

# 11. Popular Cities

Create a dedicated **Popular Cities** section.

Display a ranked list or horizontal bar chart.

Example:

### Popular Cities

1. Tokyo — 4,820 trips
2. Paris — 4,120 trips
3. New York — 3,760 trips
4. Dubai — 3,420 trips
5. London — 3,180 trips
6. Bali — 2,940 trips

Each row can include:

* Rank
* City image/avatar
* City name
* Country
* Number of trips
* Percentage growth

Example:

**Tokyo**

Japan

**4,820 trips**

**+18%**

Add:

**View All Cities**

button.

---

# 12. Popular Activities

Create a section representing the wireframe's activity/bar-chart area.

Title:

**Popular Activities**

Use a horizontal bar chart.

Example:

Sightseeing
████████████ 82%

Food Tours
██████████ 71%

Hiking
████████ 63%

Beach Activities
███████ 54%

Adventure Sports
██████ 48%

Museums
█████ 42%

Use realistic values and labels.

Add filters:

**All | Free | Paid | Adventure | Food | Culture**

---

# 13. User Trends

Create a dedicated analytics card.

Title:

**User Trends**

Display:

### New Users

**+2,480**

### Returning Users

**+1,820**

### Active Users

**18,420**

### Retention

**74.8%**

Use small trend charts/sparklines.

Add a larger line chart:

**User Growth — Last 30 Days**

The chart should support hover tooltips.

---

# 14. Trip Analytics

Create another analytics section.

Title:

**Trip Analytics**

Display:

### Trips Created

**8,426**

### Average Trip Duration

**6.8 Days**

### Average Destinations

**3.2**

### Average Budget

**₹42,800**

### Public Trips

**3,842**

### Private Trips

**4,584**

Use clean statistical cards.

---

# 15. Trip Status Distribution

Add a compact donut/pie chart.

Categories:

* Upcoming
* Ongoing
* Completed
* Cancelled

Example:

Upcoming — 32%

Ongoing — 8%

Completed — 57%

Cancelled — 3%

This provides administrators with a quick overview of platform travel activity.

---

# 16. Manage Users Section

When the admin selects:

**Manage Users**

show a full user management interface.

Create a professional data table.

Columns:

* User
* Email
* Trips
* Joined
* Last Active
* Status
* Actions

Example:

**Aarav Patel**

[aarav@example.com](mailto:aarav@example.com)

12 Trips

12 Aug 2026

Active

Actions:

`⋮`

Possible actions:

* View Profile
* View Trips
* Suspend User
* Delete User

Add:

### Search Users

**“Search by name or email…”**

Filters:

* All
* Active
* Inactive
* Suspended

Pagination:

**1 2 3 4 5 →**

---

# 17. User Profile Drawer

When an admin selects a user, open a right-side drawer.

Show:

### User Profile

Avatar

**Aarav Patel**

[aarav@example.com](mailto:aarav@example.com)

Joined:

12 Jan 2026

Status:

**Active**

Statistics:

**12 Trips**

**28 Destinations**

**64 Activities**

**₹2,48,000 Planned**

Then show:

### Recent Trips

Japan Adventure
Paris Escape
Weekend in NYC

Actions:

**View Full Profile**

**Suspend User**

---

# 18. Popular Cities Management

When selecting:

**Popular Cities**

display a dedicated table.

Columns:

* Rank
* City
* Country
* Total Trips
* Unique Travelers
* Popularity
* Growth
* Actions

Example:

**Tokyo | Japan | 4,820 | 3,420 users | 94% | +18%**

Add:

**Search Cities**

and:

**View Destination Analytics**

---

# 19. Popular Activities Management

Create a dedicated activity analytics page.

Columns:

* Activity
* Category
* City
* Bookmarks
* Trips Added
* Avg. Cost
* Popularity
* Growth

Example:

**Sushi Making Class**

Food

Tokyo

1,842 saves

1,240 trips

₹3,500

+21%

Include category filters.

---

# 20. Right-Side Information Panel

The wireframe contains an explanatory panel.

Transform it into a polished:

### Admin Quick Guide

card.

Content:

**Manage Users**

View and manage registered users, their trips, and account activity.

---

**Popular Cities**

Monitor the destinations users are visiting most frequently.

---

**Popular Activities**

Discover which activities are trending across the platform.

---

**User Trends & Analytics**

Track user growth, engagement, trip creation, and platform behavior.

---

Add small icons beside each section.

Use collapsible sections if necessary.

---

# 21. Recent Admin Activity

Add a section:

### Recent Activity

Examples:

**Aarav created a new trip**

2 minutes ago

**Priya shared an itinerary**

12 minutes ago

**New user registered**

24 minutes ago

**Tokyo became the #1 destination**

1 hour ago

**42 new community posts**

2 hours ago

Use avatars/icons and timestamps.

---

# 22. Alerts & Insights

Create a smart insights card.

Title:

**Platform Insights**

Examples:

💡 **Tokyo trips increased by 18% this month.**

📈 **User registrations are 12.8% higher than last month.**

🔥 **Food tours are currently the fastest-growing activity category.**

⚠ **18% of users have not created a trip yet.**

These should feel like actionable admin insights.

---

# 23. Date Range Control

Provide a global date range selector.

Options:

* Today
* Last 7 Days
* Last 30 Days
* Last 3 Months
* Last 6 Months
* This Year
* Custom Range

When changed, charts and statistics should update.

---

# 24. Export Functionality

Add:

**Export Report**

Dropdown:

* Export CSV
* Export PDF
* Export Excel

The button should visually indicate successful export.

Example toast:

**Report exported successfully.**

---

# 25. Notifications

Admin notifications can include:

* New user registration
* Suspicious activity
* Popular destination spike
* High community activity
* System alerts

Use a notification dropdown from the top-right bell icon.

---

# 26. Empty States

For sections with no data:

### No Data Available

**There isn't enough data to display this report yet.**

Use a subtle illustration/icon.

CTA where appropriate:

**Refresh Data**

---

# 27. Loading States

Use skeleton loaders for:

* KPI cards
* Charts
* Tables
* User lists
* Destination lists

Use shimmer effects sparingly.

---

# 28. Error State

If analytics fail to load:

### Unable to load analytics

**Something went wrong while retrieving the latest platform data.**

Button:

**Try Again**

---

# 29. Responsive Design

### Desktop

Use:

**Sidebar + Main Dashboard**

Main content should contain responsive chart/card grids.

Example:

```text
Sidebar
   |
   |---- KPI Cards
   |
   |---- Large User/Trip Chart
   |
   |---- Popular Cities | User Distribution
   |
   |---- Popular Activities | User Trends
   |
   |---- Recent Activity
```

### Tablet

Collapse the sidebar.

Use two-column cards where space allows.

### Mobile

Use:

* Hamburger menu
* Single-column cards
* Horizontally scrollable tables
* Collapsible filters
* Full-width charts
* Compact KPI cards

Do not simply shrink desktop components.

---

# 30. Visual Design Direction

Create a **premium 2026 SaaS analytics dashboard**.

Design inspiration can come from the visual cleanliness of:

* Linear
* Vercel
* Notion
* Raycast
* modern analytics products

But do NOT copy any existing product.

Combine this modern SaaS style with subtle travel elements.

Use:

* Clean cards
* Rounded corners
* Soft shadows
* Minimal borders
* Strong typography
* Spacious layouts
* Data visualization
* Consistent iconography
* Subtle hover states

Avoid:

* Old-fashioned AdminLTE appearance
* Bootstrap-style generic dashboard
* Excessive gradients
* Excessive glassmorphism
* Six identical KPI cards filling the entire screen
* Huge colorful charts
* Excessive decorative graphics

---

# 31. GlobeTrotter Color System

Use the established GlobeTrotter design system.

### Primary

Deep Royal Blue / Indigo

### Secondary

Sky Blue

### Accent

Mint / Green

### Background

Very light blue-gray / off-white

### Text

Dark Navy / Charcoal

### Muted

Slate Gray

### Success

Green

### Warning

Amber

### Danger

Red

Charts should use a restrained palette.

Do not assign random bright colors to every data series.

---

# 32. Typography

Use:

**Inter**

or

**Poppins**

Recommended hierarchy:

Dashboard title:

**28–32px**

Section title:

**18–22px**

KPI value:

**24–30px**

Body:

**14–15px**

Metadata:

**12–13px**

Ensure the dashboard feels dense enough for analytics but not cluttered.

---

# 33. Charts

Use a professional charting library such as:

**Recharts**

Include:

* Line chart
* Area chart
* Donut chart
* Horizontal bar chart
* Sparklines

Charts must include:

* Tooltips
* Legends where necessary
* Responsive containers
* Clear labels
* Proper empty states

Avoid unnecessary 3D charts.

---

# 34. Microinteractions

Add subtle interactions:

* Sidebar collapse
* Navigation hover
* Card hover
* Chart tooltip
* Filter dropdown
* Date-range transition
* Table row hover
* User drawer opening
* Toast notifications
* Export feedback

Use smooth transitions around:

**150–250ms**

Avoid excessive animation.

---

# 35. Accessibility

Ensure:

* Good color contrast
* Keyboard navigation
* Visible focus states
* Semantic buttons
* Accessible chart labels
* Accessible table headers
* Screen-reader-friendly icons
* Do not communicate information using color alone

---

# 36. Technical Requirements

Build using:

* React
* Tailwind CSS
* Lucide React
* Recharts
* Responsive CSS
* Reusable components
* Data-driven UI

Suggested components:

* `AdminLayout`
* `AdminSidebar`
* `AdminNavbar`
* `AdminHeader`
* `SearchToolbar`
* `KPICard`
* `GrowthChart`
* `UserDistributionChart`
* `PopularCities`
* `PopularActivities`
* `UserTrends`
* `TripAnalytics`
* `TripStatusChart`
* `RecentActivity`
* `InsightCard`
* `UserTable`
* `UserDrawer`
* `DateRangePicker`
* `ExportMenu`
* `NotificationMenu`

Keep components modular and reusable.

---

# 37. Sample Dashboard Data

Use realistic demo data.

### Users

**24,580**

### Trips

**8,426**

### Active Trips

**2,184**

### Destinations

**1,284**

### Community Posts

**5,892**

### Popular Cities

Tokyo
Paris
New York
Dubai
London
Bali

### Popular Activities

Sightseeing
Food Tours
Hiking
Beach Activities
Adventure Sports
Museums

---

# 38. Important Wireframe Instruction

The uploaded wireframe should remain the **base structural reference**.

Preserve these core ideas:

**GlobeTrotter Header**

↓

**Search / Group By / Filter / Sort By**

↓

**Admin Management Navigation**

↓

**Analytics Visualization**

Including:

* Pie/Donut chart
* User/trend line chart
* Popular activity bar chart
* Statistical information

↓

**Admin Information Panel**

However, the final design should be a **complete modern admin system**, not merely a styled version of the wireframe.

The wireframe's visual placeholders should be replaced with actual UI components and realistic data.

---

# Final UX Goal

The Admin Panel should immediately allow an administrator to answer:

1. How many users are using GlobeTrotter?
2. How many trips are being created?
3. Which cities are most popular?
4. Which activities are trending?
5. How fast are users growing?
6. How active is the community?
7. Which trips are currently active?
8. Which users are most active?
9. What travel trends are emerging?
10. What areas of the platform need attention?

The final result should look like a **real production-ready GlobeTrotter Admin Console**, combining the provided wireframe's structure with a sophisticated modern analytics experience.

Do not create a generic admin template.

Create a **travel-specific analytics and management platform** with a strong visual identity, realistic data, useful interactions, and excellent responsive behavior.
