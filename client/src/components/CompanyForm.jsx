import React, { useState } from 'react';
import { createCompany } from '../services/companyService';

const CompanyForm = ({ onCompanyCreated }) => {
  const [name, setName] = useState('');
  const [industry, setIndustry] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Company name is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccess('');
      const res = await createCompany({ name: name.trim(), industry: industry.trim() });
      const createdCompany = res.data?.data || res.data;
      setSuccess('Company created successfully!');
      setName('');
      setIndustry('');
      if (onCompanyCreated && createdCompany) {
        onCompanyCreated(createdCompany);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create company');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      {error && <div className="p-2 mb-4 text-xs text-danger border rounded bg-red-50">{error}</div>}
      {success && <div className="p-2 mb-4 text-xs text-success border rounded bg-green-50">{success}</div>}

      <div className="form-group">
        <label className="form-label">Company Name *</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Google"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Industry</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g. Technology"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary w-full" disabled={loading}>
        {loading ? 'Creating...' : 'Create Company'}
      </button>
    </form>
  );
};

export default CompanyForm;
