import React, { useState } from 'react';
import { createContact } from '../services/contactService';

const ContactForm = ({ companies, onContactCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !companyId) {
      setError('Name, email, and company selection are required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await createContact({
        name: name.trim(),
        email: email.trim(),
        company: companyId,
      });
      const created = res.data?.data || res.data;
      setSuccess('Contact created successfully!');
      setName('');
      setEmail('');
      setCompanyId('');
      if (onContactCreated && created) {
        onContactCreated(created);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create contact');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <div className="p-2 mb-4 text-xs text-danger border rounded bg-red-50">{error}</div>}
      {success && <div className="p-2 mb-4 text-xs text-success border rounded bg-green-50">{success}</div>}

      <div className="form-group">
        <label className="form-label">Contact Name *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Sundar Pichai"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email *</label>
        <input
          type="email"
          className="form-input"
          placeholder="e.g. sundar@google.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Company *</label>
        <select
          className="form-select"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
        >
          <option value="">Select Company</option>
          {(companies || []).map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
