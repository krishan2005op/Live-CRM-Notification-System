import React, { useState, useEffect } from 'react';
import { getCompanies } from '../services/companyService';
import { getContacts } from '../services/contactService';
import { getAssignments } from '../services/assignmentService';
import { getUsers } from '../services/userService';

import CompanyForm from './CompanyForm';
import CompanyTable from './CompanyTable';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import AssignmentForm from './AssignmentForm';
import AssignmentTable from './AssignmentTable';

const DashboardLayout = ({ currentUserId, notifications }) => {
  const [companies, setCompanies] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all CRM data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [compRes, contRes, assRes, userRes] = await Promise.all([
          getCompanies(),
          getContacts(),
          getAssignments(),
          getUsers(),
        ]);

        const compData = Array.isArray(compRes.data) ? compRes.data : (compRes.data?.data || []);
        const contData = Array.isArray(contRes.data) ? contRes.data : (contRes.data?.data || []);
        const assData = Array.isArray(assRes.data) ? assRes.data : (assRes.data?.data || []);
        const userData = Array.isArray(userRes.data) ? userRes.data : (userRes.data?.data || []);

        setCompanies(compData);
        setContacts(contData);
        setAssignments(assData);
        setUsers(userData);
      } catch (err) {
        console.error('Failed to load dashboard data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCompanyCreated = (newCompany) => {
    if (newCompany && newCompany._id) {
      setCompanies((prev) => [newCompany, ...prev]);
    }
  };

  const handleContactCreated = (newContact) => {
    if (newContact && newContact._id) {
      setContacts((prev) => [newContact, ...prev]);
    }
  };

  const handleAssignmentCreated = (newAssignment) => {
    if (newAssignment && newAssignment._id) {
      setAssignments((prev) => [newAssignment, ...prev]);
    }
  };

  if (loading) {
    return (
      <div className="container py-6 text-center text-muted">
        Loading CRM Dashboard...
      </div>
    );
  }

  // Find currently logged-in user object
  const currentUser = users.find((u) => u._id === currentUserId);
  const isAdmin = currentUser?.isAdmin === true;

  // Filter assignments for normal user view
  const myAssignments = assignments.filter((a) => {
    const assignedId = typeof a.user === 'object' ? a.user?._id : a.user;
    return assignedId === currentUserId;
  });

  return (
    <div className="container py-6">
      {isAdmin ? (
        /* ================= ADMIN VIEW ================= */
        <>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2>Admin Management Panel</h2>
              <p className="text-muted text-sm">
                Create & Manage Companies, Contacts, and User Assignments.
              </p>
            </div>
            <span className="btn btn-sm btn-outline text-xs" style={{ cursor: 'default' }}>
              Role: Admin
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Companies Section */}
            <div className="card">
              <h3 className="mb-4">Companies</h3>
              <CompanyForm onCompanyCreated={handleCompanyCreated} />
              <CompanyTable companies={companies} />
            </div>

            {/* Contacts Section */}
            <div className="card">
              <h3 className="mb-4">Contacts</h3>
              <ContactForm companies={companies} onContactCreated={handleContactCreated} />
              <ContactTable contacts={contacts} />
            </div>

            {/* Assignments Section */}
            <div className="card">
              <h3 className="mb-4">Assignments</h3>
              <AssignmentForm
                users={users}
                companies={companies}
                contacts={contacts}
                currentUserId={currentUserId}
                onAssignmentCreated={handleAssignmentCreated}
              />
              <AssignmentTable assignments={assignments} />
            </div>
          </div>
        </>
      ) : (
        /* ================= NORMAL USER VIEW ================= */
        <>
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2>Welcome, {currentUser?.name || 'User'}!</h2>
              <p className="text-muted text-sm">
                View your assigned companies/contacts and recent live notifications.
              </p>
            </div>
            <span className="btn btn-sm btn-outline text-xs" style={{ cursor: 'default' }}>
              Role: Standard User
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Assignments */}
            <div className="card">
              <h3 className="mb-4">My Assignments</h3>
              <AssignmentTable assignments={myAssignments} />
            </div>

            {/* Live Notifications Feed */}
            <div className="card">
              <h3 className="mb-4">Recent Notifications</h3>
              {(!notifications || notifications.length === 0) ? (
                <div className="p-4 text-center text-muted border rounded">
                  No notifications found
                </div>
              ) : (
                <div className="flex-col gap-2">
                  {notifications.slice(0, 10).map((n) => (
                    <div
                      key={n._id || Math.random()}
                      className="p-3 border rounded mb-2 bg-white"
                      style={{
                        borderLeft: !n.read ? '4px solid var(--primary-color)' : '1px solid var(--border-color)',
                      }}
                    >
                      <div className="font-semibold text-sm">{n.title}</div>
                      <div className="text-sm text-muted mt-1">{n.message}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardLayout;
