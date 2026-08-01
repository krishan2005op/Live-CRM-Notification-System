import React, { useState } from 'react';
import { createAssignment } from '../services/assignmentService';

const AssignmentForm = ({ users, companies, contacts, currentUserId, onAssignmentCreated }) => {
  const [targetUserId, setTargetUserId] = useState('');
  const [entityType, setEntityType] = useState('company');
  const [entityId, setEntityId] = useState('');
  const [role, setRole] = useState('Owner');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!targetUserId || !entityType || !entityId || !role) {
      setError('All fields are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await createAssignment({
        user: targetUserId,
        entityType,
        entityId,
        role,
        assignedBy: currentUserId || targetUserId,
      });
      const created = res.data?.data || res.data;
      setSuccess('Assignment created successfully!');
      setEntityId('');
      if (onAssignmentCreated && created) {
        onAssignmentCreated(created);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  const entityOptions = entityType === 'company' ? (companies || []) : (contacts || []);

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <div className="p-2 mb-4 text-xs text-danger border rounded bg-red-50">{error}</div>}
      {success && <div className="p-2 mb-4 text-xs text-success border rounded bg-green-50">{success}</div>}

      <div className="form-group">
        <label className="form-label">Assign To User *</label>
        <select
          className="form-select"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        >
          <option value="">Select User</option>
          {(users || []).map((u) => (
            <option key={u._id} value={u._id}>
              {u.name} ({u.email})
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Entity Type *</label>
        <select
          className="form-select"
          value={entityType}
          onChange={(e) => {
            setEntityType(e.target.value);
            setEntityId('');
          }}
        >
          <option value="company">Company</option>
          <option value="contact">Contact</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">
          Select {entityType === 'company' ? 'Company' : 'Contact'} *
        </label>
        <select
          className="form-select"
          value={entityId}
          onChange={(e) => setEntityId(e.target.value)}
        >
          <option value="">
            Select {entityType === 'company' ? 'Company' : 'Contact'}
          </option>
          {entityOptions.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Role *</label>
        <select
          className="form-select"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Owner">Owner</option>
          <option value="Manager">Manager</option>
          <option value="Viewer">Viewer</option>
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Assigning...' : 'Assign'}
      </button>
    </form>
  );
};

export default AssignmentForm;
