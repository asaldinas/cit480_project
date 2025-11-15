// Dashboard.jsx
import React from "react";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="ct-root">
      {/* Sidebar */}
      <aside className="ct-sidebar">
        <div className="ct-logo">
          <span>Career-Track</span>
        </div>

        <nav className="ct-nav">
          <button className="ct-nav-item ct-nav-item--active">
            <span className="ct-nav-icon" />
            <span>Dashboard</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Analytics</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Calendar</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Contacts</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Documents</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Settings</span>
          </button>
          <button className="ct-nav-item">
            <span className="ct-nav-icon" />
            <span>Privacy</span>
          </button>
        </nav>

        <div className="ct-sidebar-footer">
          {/* Replace with your logo/image */}
          <div className="ct-sidebar-logo-placeholder">Logo</div>
        </div>
      </aside>

      {/* Main area */}
      <div className="ct-main">
        {/* Top header */}
        <header className="ct-header">
          <div className="ct-header-left">
            <h1 className="ct-page-title">August 2025 Dashboard</h1>

            <button className="ct-chip">
              <span>August 2025 Dashboard</span>
              <span className="ct-chevron-down" />
            </button>
          </div>

          <div className="ct-header-right">
            <button className="ct-user-select">
              <span className="ct-user-icon" />
              <span>User</span>
              <span className="ct-chevron-down" />
            </button>

            {/* profile image placeholder */}
            <div className="ct-avatar-placeholder" />
          </div>
        </header>

        {/* Search bar */}
        <div className="ct-search-wrapper">
          <div className="ct-search">
            <span className="ct-search-icon" />
            <input
              className="ct-search-input"
              placeholder="Search jobs, companies, or positions..."
            />
          </div>
        </div>

        {/* Content cards */}
        <main className="ct-content">
          {/* Column 1: To Do List */}
          <section className="ct-column">
            <h2 className="ct-card-title">To Do List</h2>

            <div className="ct-card">
              {/* Company */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Company</span>
                  <span className="ct-value">Tech Corp</span>
                </div>
              </div>

              {/* Position */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Position</span>
                  <span className="ct-value">Software Engineer</span>
                </div>
              </div>

              {/* Salary */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Salary</span>
                  <span className="ct-value">$85,000</span>
                </div>
              </div>
            </div>

            <div className="ct-card ct-card-secondary">
              <button className="ct-outline-btn">+ Add new job</button>
            </div>
          </section>

          {/* Column 2: Submitted Applications */}
          <section className="ct-column">
            <h2 className="ct-card-title">Submitted Applications</h2>

            <div className="ct-card">
              {/* Company */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Company</span>
                  <span className="ct-value">XYZ Example</span>
                </div>
              </div>

              {/* Position */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Position</span>
                  <span className="ct-value">Cashier</span>
                </div>
              </div>

              {/* Salary */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Salary</span>
                  <span className="ct-value">$12.00 /hr</span>
                </div>
              </div>
            </div>

            <div className="ct-card ct-card-secondary">
              <button className="ct-outline-btn">+ Add new job</button>
            </div>
          </section>

          {/* Column 3: Responses */}
          <section className="ct-column">
            <h2 className="ct-card-title">Responses</h2>

            <div className="ct-card">
              {/* Company */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Company</span>
                  <span className="ct-value">Costco</span>
                </div>
              </div>

              {/* Position */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Position</span>
                  <span className="ct-value">IT Professional</span>
                </div>
              </div>

              {/* Salary */}
              <div className="ct-row">
                <div className="ct-row-icon" />
                <div className="ct-row-text">
                  <span className="ct-label">Salary</span>
                  <span className="ct-value">$55,000</span>
                </div>
              </div>
            </div>

            <div className="ct-card ct-card-secondary">
              <button className="ct-outline-btn">+ Add new job</button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
