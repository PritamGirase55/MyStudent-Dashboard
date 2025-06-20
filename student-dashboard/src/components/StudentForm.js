import { useState } from 'react';

function StudentForm({ onAddStudent, courses }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    courseId: '',
    image: null,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.courseId) newErrors.course = 'Course is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    onAddStudent(formData);
    setFormData({ name: '', email: '', courseId: '', image: null });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      <div>
        <label>Course</label>
        <select name="courseId" value={formData.courseId} onChange={handleChange}>
          <option value="">Select a course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
        {errors.course && <span style={{ color: 'red' }}>{errors.course}</span>}
      </div>
      <div>
        <label>Profile Image</label>
        <input type="file" name="image" onChange={handleChange} />
      </div>
      <button type="submit">Add Student</button>
    </form>
  );
}

export default StudentForm;