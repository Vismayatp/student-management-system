
import { useEffect, useState } from 'react';
import StudentTable from '../components/StudentTable';
import StudentForm from '../components/StudentForm';

function Dashboard({ onLogout }) {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');//add

  const token = localStorage.getItem('token');

  const filteredStudents = students.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchStudents = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/students',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Could not load students');
        return;
      }

      setStudents(data);
    } catch (error) {
      setMessage('Unable to connect to the server.');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const url = editingStudent
        ? `http://localhost:5000/api/students/${editingStudent._id}`
        : 'http://localhost:5000/api/students';

      const response = await fetch(url, {
        method: editingStudent ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Operation failed');
        return;
      }

      setShowForm(false);
      setEditingStudent(null);
      setMessage('Student saved successfully!');
      fetchStudents();
    } catch (error) {
      setMessage('Unable to save student.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/students/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Delete failed');
        return;
      }

      setMessage('Student deleted successfully!');
      fetchStudents();
    } catch (error) {
      setMessage('Unable to delete student.');
    }
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>StudentHub</h2>
        <nav>
          <a href="#overview" className="active">Dashboard</a>
          <a href="#students">Students</a>
          <a href="#courses">Courses</a>
        </nav>

        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <input
              type="text"
              placeholder="Search by name, email or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h4>Welcome to your student management system.</h4>
          </div>
        </header>

        <section className="stats-container">
          <div className="stat-card">
            <h3>Total Students</h3>
            <h2>{students.length}</h2>
            <p>Registered students</p>
          </div>

          <div className="stat-card">
            <h3>Total Courses</h3>
            <h2>{new Set(students.map((s) => s.course)).size}</h2>
            <p>Unique courses</p>
          </div>

          <div className="stat-card">
            <h3>Student Records</h3>
            <h2>{students.length}</h2>
            <p>Available records</p>
          </div>
        </section>

        <section className="student-section" id="students">
          <div className="section-header">
            <h2>Student Records</h2>

            <button onClick={() => {
              setEditingStudent(null);
              setShowForm(true);
              setMessage('');
            }}>
              Add Student
            </button>
          </div>

          {message && <p>{message}</p>}

          {showForm && (
            <StudentForm
              onSubmit={handleSubmit}
              editingStudent={editingStudent}
              onCancel={() => {
                setShowForm(false);
                setEditingStudent(null);
              }}
            />
          )}

          <StudentTable
            students={filteredStudents}
            onEdit={(student) => {
              setEditingStudent(student);
              setShowForm(true);
              setMessage('');
            }}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
