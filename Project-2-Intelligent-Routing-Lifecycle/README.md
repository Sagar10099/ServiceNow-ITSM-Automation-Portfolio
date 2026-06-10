# Project 2: Intelligent Ticket Routing & Automation Lifecycle Controller

## 📌 Project Overview
Manual triage and routing of incoming incidents inside enterprise IT operations introduce human processing errors and delay ticket assignment lifecycles. 

This project configures an automated, server-side data routing matrix using a **ServiceNow Advanced Before Business Rule** to dynamically map assignment teams based on incoming ticket categories.

---

## 🛠️ Step-by-Step Configuration Layout

* **Module Type:** Advanced Business Rule (Server-Side Script)
* **Table Target:** `Incident [incident]`
* **Execution Boundary:** Runs `Before` database transaction on `Insert` operations.
* **Filter Guards:** Triggers ONLY when `[Category] [is not empty]` AND `[Assignment Group] [is empty]`.

### Core Automated Script Logic
```javascript
(function executeRule(current, previous) {
    
    // Extract dynamic runtime category
    var selectedCategory = current.getValue('category');
    
    // Routing Matrix Integration
    if (selectedCategory == 'hardware') {
        current.assignment_group.setDisplayValue('Hardware');
    } else if (selectedCategory == 'software') {
        current.assignment_group.setDisplayValue('Software');
    } else if (selectedCategory == 'network') {
        current.assignment_group.setDisplayValue('Network');
    } else if (selectedCategory == 'database') {
        current.assignment_group.setDisplayValue('Database');
    }
    
    // Audit log trail commit
    current.work_notes = "Automated routing matrix applied based on Category: " + selectedCategory;

})(current, previous);
