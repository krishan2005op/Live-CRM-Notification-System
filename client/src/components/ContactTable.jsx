import React from 'react';

const ContactTable = ({ contacts }) => {
  const validContacts = (contacts || []).filter((c) => c && c.name);

  if (validContacts.length === 0) {
    return <div className="p-4 text-center text-muted border rounded">No contacts found</div>;
  }

  return (
    <div className="table-container border rounded">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {validContacts.map((contact) => (
            <tr key={contact._id || Math.random()}>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>
                {typeof contact.company === 'object' && contact.company !== null
                  ? contact.company.name
                  : contact.company || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactTable;
