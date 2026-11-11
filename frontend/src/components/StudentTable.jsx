
function StudentTable({ students, onEdit, onDelete }) {
  return (
    <div className="student-table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Roll Number</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="6">No students found.</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>
                <td>{student.fullName}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.rollNumber}</td>
                <td>{student.course}</td>
                <td>
                  <button onClick={() => onEdit(student)}>
                    Edit
                  </button>

                  <button onClick={() => onDelete(student._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
