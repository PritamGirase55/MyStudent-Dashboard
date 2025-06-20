function StudentList({ students, courseMap, onEditStudent }) {
  return (
    <div>
      <h2>Student List</h2>
      {students.length === 0 ? (
        <p>No students added yet.</p>
      ) : (
        <ul>
          {students.map((student, index) => (
            <li key={index}>
              <img
                src={student.image ? URL.createObjectURL(student.image) : ''}
                alt={student.name}
                width="50"
                style={{ borderRadius: '50%' }}
              />
              <span>{student.name}</span>
              <span>{student.email}</span>
              <span>
                {courseMap && courseMap[student.courseId]
                  ? courseMap[student.courseId]
                  : 'Unknown Course'}
              </span>
              <button onClick={() => onEditStudent(index)}>Edit</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StudentList;