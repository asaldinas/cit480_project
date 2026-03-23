<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Month Dashboard Picker</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      background-color: #f7f7f7;
    }

    label {
      display: block;
      margin-bottom: 8px;
      font-weight: bold;
    }

    select {
      padding: 8px 12px;
      font-size: 16px;
      border-radius: 6px;
      border: 1px solid #ccc;
      cursor: pointer;
      background-color: #ffffff;
    }

    .month-picker {
      position: absolute;
      margin-top: 8px;
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 8px;
      background-color: #ffffff;
      box-shadow: 0 4px 10px rgba(0,0,0,0.12);
      width: 260px;
      display: none;
      z-index: 100;
    }

    .month-picker-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .month-picker-header button {
      border: none;
      background: none;
      font-size: 18px;
      cursor: pointer;
      padding: 4px 8px;
    }

    .month-picker-year {
      font-weight: bold;
    }

    .month-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .month-btn {
      padding: 6px 0;
      border-radius: 4px;
      border: 1px solid #ddd;
      background-color: #f5f5f5;
      cursor: pointer;
      font-size: 14px;
      text-align: center;
    }

    .month-btn:hover {
      background-color: #e0e0e0;
    }
/* User menu container (top-right fixed) */
.user-menu {
  position: fixed;
  top: 20px;
  right: 20px;
  font-family: sans-serif;
  z-index: 500;
}

/* User button styling */
.user-btn {
  padding: 8px 14px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}

.user-btn:hover {
  background-color: #f0f0f0;
}

/* Dropdown box */
.user-dropdown {
  position: absolute;
  top: 42px;
  right: 0;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  width: 140px;
  display: none;
}

/* Dropdown items */
.dropdown-item {
  padding: 10px 14px;
  cursor: pointer;
  font-size: 14px;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}


  </style>
</head>
<body>
    <div class="user-menu">
  <button id="userButton" class="user-btn">User ▾</button>
  <div id="userDropdown" class="user-dropdown">
    <div class="dropdown-item" data-page="Settings">Settings</div>
    <div class="dropdown-item" data-page="Sign Out">Sign Out</div>
  </div>
</div>

  <label for="monthSelect"></label>
  <select id="monthSelect">
    <option value="">Select</option>
  </select>

  <!-- Month picker popup -->
  <div id="monthPicker" class="month-picker">
    <div class="month-picker-header">
      <button id="prevYear" aria-label="Previous year">&#9664;</button>
      <span id="pickerYear" class="month-picker-year"></span>
      <button id="nextYear" aria-label="Next year">&#9654;</button>
    </div>
    <div class="month-grid" id="monthGrid"></div>
  </div>

  <script>
  const select = document.getElementById('monthSelect');
  const monthPicker = document.getElementById('monthPicker');
  const pickerYearSpan = document.getElementById('pickerYear');
  const prevYearBtn = document.getElementById('prevYear');
  const nextYearBtn = document.getElementById('nextYear');
  const monthGrid = document.getElementById('monthGrid');

  const now = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // --- Populate main dropdown with next 5 months + "Show more..." ---
  for (let i = 0; i < 5; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = monthNames[d.getMonth()];
    const year = d.getFullYear();
    const label = `${monthName} ${year} Dashboard`;

    const option = document.createElement('option');
    option.value = label;
    option.textContent = label;
    select.appendChild(option);
  }

  const moreOption = document.createElement('option');
  moreOption.value = "__more__";
  moreOption.textContent = "Show more months…";
  select.appendChild(moreOption);

  select.addEventListener('change', () => {
    if (!select.value) return;

    if (select.value === "__more__") {
      select.value = "";
      showMonthPicker();
    } else {
      openDashboardPage(select.value);
      select.value = "";
    }
  });

  // --- Month picker logic ---
  let pickerYear = now.getFullYear();

  function updatePickerYearLabel() {
    pickerYearSpan.textContent = pickerYear;
  }

  function buildMonthButtons() {
    monthGrid.innerHTML = "";
    monthNames.forEach((name) => {
      const btn = document.createElement('button');
      btn.type = "button";
      btn.className = "month-btn";
      btn.textContent = name.slice(0, 3); // Jan, Feb, ...
      btn.addEventListener('click', () => {
        const label = `${name} ${pickerYear} Dashboard`;
        openDashboardPage(label);
        hideMonthPicker();
      });
      monthGrid.appendChild(btn);
    });
  }

  function showMonthPicker() {
    pickerYear = now.getFullYear();
    updatePickerYearLabel();

    // position under the select
    const rect = select.getBoundingClientRect();
    monthPicker.style.left = rect.left + "px";
    monthPicker.style.top = (rect.bottom + window.scrollY) + "px";

    monthPicker.style.display = "block";
  }

  function hideMonthPicker() {
    monthPicker.style.display = "none";
  }

  prevYearBtn.addEventListener('click', () => {
    pickerYear--;
    updatePickerYearLabel();
  });

  nextYearBtn.addEventListener('click', () => {
    pickerYear++;
    updatePickerYearLabel();
  });

  // close month picker when clicking outside
  document.addEventListener('click', (e) => {
    if (!monthPicker.contains(e.target) && e.target !== select) {
      hideMonthPicker();
    }
  });

  function openDashboardPage(label) {
    const newPage = window.open("", "_blank");
    newPage.document.write(`
      <html>
        <body style="
          font-family: sans-serif;
          font-size: 2rem;
          text-align:center;
          padding-top:50px;
          background-color: #f0f0f0;
        ">
          ${label}
        </body>
      </html>
    `);
    newPage.document.close();
  }

  // build the month buttons immediately so they're ready
  buildMonthButtons();
  updatePickerYearLabel();

  // ========== USER MENU (Laravel routes) ==========

  // These must be processed by Blade: make sure this file is resources/views/dashboard.blade.php
  const settingsUrl = "{{ route('settings') }}";
  const signoutUrl = "{{ route('signout') }}";

  const userButton = document.getElementById("userButton");
  const userDropdown = document.getElementById("userDropdown");

  userButton.addEventListener("click", () => {
    userDropdown.style.display =
      userDropdown.style.display === "block" ? "none" : "block";
  });

  // close user dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!userButton.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.style.display = "none";
    }
  });

  // handle clicking dropdown items
  document.querySelectorAll(".dropdown-item").forEach(item => {
    item.addEventListener("click", () => {
      const page = item.dataset.page; // "Settings" or "Sign Out"

      let url = "#";
      if (page === "Settings") {
        url = settingsUrl;
      } else if (page === "Sign Out") {
        url = signoutUrl;
      }

      window.open(url, "_blank"); // open real Laravel page
      userDropdown.style.display = "none";
    });
  });
</script>

  
</body>
</html>
