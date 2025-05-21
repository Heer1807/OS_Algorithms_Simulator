# OS Algorithms Simulator

A web-based visualization tool demonstrating various classic Operating System algorithms using **HTML**, **CSS**, and **JavaScript**. This simulator is designed for educational purposes to help students and enthusiasts understand how these core algorithms work in a visual and interactive way.

---

## Features & Implemented Algorithms

### 1. C-LOOK Disk Scheduling
- **Description:** Optimized version of LOOK algorithm. The head only goes as far as the last request in one direction and then jumps to the beginning without servicing in reverse.
- **Files:**
  - `index.html`: UI for entering request queue and head position
  - `script.js`: Implements C-LOOK logic and calculates seek time
  - `style.css`: Styles the disk simulation

---

### 2. Dining Philosopher Problem
- **Description:** Simulates a classic synchronization problem in OS where philosophers try to eat without causing a deadlock or starvation.
- **Files:**
  - `index.html`: Visual layout of philosophers and chopsticks
  - `script.js`: Handles philosopher states (Thinking, Hungry, Eating)
  - `style.css`: Animations and styling

---

### 3. FIFO Page Replacement
- **Description:** Simulates the FIFO (First-In-First-Out) page replacement strategy used in virtual memory.
- **Files:**
  - `index.html`: Input form for pages and frame size
  - `script.js`: FIFO logic with hit/miss calculation
  - `style.css`: Page frame transitions

---

### 4. SJF (Shortest Job First) Scheduling
- **Description:** Simulates non-preemptive SJF CPU scheduling algorithm, calculating waiting and turnaround times.
- **Files:**
  - `index.html`: Form to enter burst times of processes
  - `script.js`: Sorts and schedules jobs using SJF
  - `style.css`: Gantt chart-style output

---

### 5. Final Demo Assets
- A set of `.jpg` images (`p1.jpg` to `p4.jpg`) included for use in the final visual demonstration.
- `style.css` file to support any global or final custom styles.

---

## How to Run Locally

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/Heer1807/OS_Algorithms_Simulator.git
   cd OS_Algorithms_Simulator

2.**Open in Browser:**

Navigate to any module folder (e.g., C-look disk scheduling) and open index.html in a web browser.

No server required — runs completely on client-side.
