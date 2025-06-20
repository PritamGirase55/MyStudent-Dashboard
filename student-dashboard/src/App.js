import { useState, useEffect, useMemo } from 'react';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import './styles/App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/courses');
        console.log('Response status:', response.status, response.statusText);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    setTimeout(() => {
      console.log('This runs after the event loop processes the async fetch');
    }, 0);
  }, []);

  const courseMap = useMemo(() => {
    return courses.reduce((map, course) => {
      map[course.id] = course.name;
      return map;
    }, {});
  }, [courses]);

  const handleAddStudent = (student) => {
    if (editingIndex !== null) {
      const updatedStudents = [...students];
      updatedStudents[editingIndex] = student;
      setStudents(updatedStudents);
      setEditingIndex(null);
    } else {
      setStudents([...students, student]);
    }
  };

  const handleEditStudent = (index) => {
    setEditingIndex(index);
  };

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <h1>Student Management Dashboard</h1>
      <StudentForm
        onAddStudent={handleAddStudent}
        courses={courses}
        initialData={editingIndex !== null ? students[editingIndex] : null}
      />
      <StudentList
        students={students}
        courseMap={courseMap}
        onEditStudent={handleEditStudent}
      />
    </div>
  );
}

export default App;