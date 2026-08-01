import React from 'react';
import { format } from 'date-fns';

const CompanyTable = ({ companies }) => {
  const validCompanies = (companies || []).filter((c) => c && c.name);

  if (validCompanies.length === 0) {
    return <div className="p-4 text-center text-muted border rounded">No companies found</div>;
  }

  return (
    <div className="table-container border rounded">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Industry</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {validCompanies.map((company) => (
            <tr key={company._id || company.id || Math.random()}>
              <td>{company.name}</td>
              <td>{company.industry || '-'}</td>
              <td>
                {company.createdAt
                  ? format(new Date(company.createdAt), 'MMM d, yyyy')
                  : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompanyTable;
