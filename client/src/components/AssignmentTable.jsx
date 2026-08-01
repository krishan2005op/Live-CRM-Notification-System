import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const AssignmentTable = ({ assignments }) => {
  const validAssignments = (assignments || []).filter((a) => a);

  if (validAssignments.length === 0) {
    return <div className="p-4 text-center text-muted border rounded">No assignments found</div>;
  }

  return (
    <div className="table-container border rounded">
      <table>
        <thead>
          <tr>
            <th>Assigned User</th>
            <th>Type</th>
            <th>Role</th>
            <th>Assigned By</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {validAssignments.map((assignment) => {
            const userName =
              typeof assignment.user === 'object' && assignment.user !== null
                ? assignment.user.name
                : assignment.user || '-';

            const assignedByName =
              typeof assignment.assignedBy === 'object' && assignment.assignedBy !== null
                ? assignment.assignedBy.name
                : assignment.assignedBy || '-';

            return (
              <tr key={assignment._id || Math.random()}>
                <td>{userName}</td>
                <td style={{ textTransform: 'capitalize' }}>{assignment.entityType || '-'}</td>
                <td>{assignment.role || '-'}</td>
                <td>{assignedByName}</td>
                <td>
                  {assignment.createdAt
                    ? formatDistanceToNow(new Date(assignment.createdAt), { addSuffix: true })
                    : '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
