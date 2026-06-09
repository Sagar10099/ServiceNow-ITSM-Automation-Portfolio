# Project 2: Intelligent Ticket Routing & Automation Lifecycle Controller

## 📌 Project Architecture Overview
In enterprise IT operations management (ITSM), manual triage and assignment of incidents introduce human errors, delay Resolution Times (MTTR), and cause frequent SLA breaches. 

This multi-component automation system focuses on streamlining the ticket lifecycle from instantiation to resolution. It leverages server-side platform scripting (**GlideRecord API**), condition-based transactional interceptors (**Business Rules**), and async cron processing (**Scheduled Jobs**).

---

## 🛠️ Phase A: Intelligent Data-Driven Incident Routing Engine

### 1. Objective & Design Pattern
The core intent is to intercept every inbound incident request at the datastore layer *before* it gets committed to the database. If a record has an active `Category` but lacks an assigned operational team, the script automatically parses standard assignment matrices, maps the target group dynamic reference, and flushes structural parameters without human dispatch intervention.

### 2. Platform Implementation Blueprint
* **Module Type:** Advanced Business Rule (Server-Side Script)
* **Execution Boundary:** `Before` transaction on `Insert` operations.
* **Conditional Optimization:** Executed ONLY when `[Category] [is not empty]` AND `[Assignment Group] [is empty]`. 

### 3. Core Architectural Script Block
The system monitors changes on transaction structures using the platform `current` context:

```javascript
// Data-Driven Mapping Engine
var selectedCategory = current.getValue('category');

if (selectedCategory == 'hardware') {
    current.assignment_group.setDisplayValue('Hardware');
} else if (selectedCategory == 'software') {
    current.assignment_group.setDisplayValue('Software');
}

current.work_notes = "Automated routing matrix applied based on Category: " + selectedCategory;
