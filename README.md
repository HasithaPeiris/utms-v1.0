# University Timetable Management System

## Description

This project is a university timetable system developed using the MERN stack. The system facilitates the creation, modification, and querying of class schedules for students, faculty, and administrative staff. Emphasis is placed on secure access, data integrity, and user-friendly interfaces.

## Functional Requirements

1. **User Roles and Authentication**: Secure login functionality and session management using JWT for Admin, Faculty, and Student roles.
   
2. **Course Management**: Admins can manage courses and assign Faculty to courses.
   
3. **Timetable Management**: Creation and modification of weekly timetables for different courses. Includes functionality to add, update, and delete class sessions.
   
4. **Room and Resource Booking**: Allow booking of rooms and resources for classes or events, ensuring no overlaps.
   
5. **Student Enrollment**: Enable students to enroll in courses and view their timetables. Allow Faculty and Admins to view and manage student enrollments in courses.
   
6. **Notifications and Alerts**: Notify users of timetable changes, room changes, or important announcements.

## Non-Functional Requirements

1. **Security**: Protected sensitive data through encryption and security practices.
   
2. **Error Handling and Logging**: Implemented robust error handling mechanisms and logging to facilitate debugging and monitoring.

## Additional Testing Requirements

1. **Unit Testing**: Implemented unit tests for individual components and functions to validate their behavior in isolation using Jest.
   
2. **Integration Testing**: Tested interactions between controllers, services, and the MongoDB database to ensure different parts of the application work together seamlessly.
   
3. **Security Testing**: Performed security tests to identify vulnerabilities within the application, such as SQL injection and cross-site scripting (XSS), using tools like OWASP ZAP or Burp Suite.

4. **Performance Testing**: Evaluated the API's performance under various loads using artillery.io to ensure it can handle multiple requests simultaneously without significant latency.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/HasithaPeiris/utms-v1.0.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Update `.env` with appropriate configurations, including database connection details and JWT secret key.

4. Start the server:

   ```bash
   npm start
   ```

## API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Authentication is required for most endpoints. You need to register and log in as a new user or you can use the credentials below to login.

## Authorization

**Admin**
1. Manage Courses
2. Manage Users
3. Manage Sessions
4. Manage Enrollments
5. Manage Faculties
6. Manage Bookings

**Faculty**
1. Manage Courses
2. Manage Sessions
3. Manage Bookings
4. Manage Enrollments

**Student**
1. Enroll Courses
2. View Timetables

## Endpoints

### Users

#### `POST /users` - Create a new user.
#### `GET /users/{user_id}` - Retrieve details of a specific user.
#### `PUT /users/{user_id}` - Update a user.
#### `DELETE /users/{user_id}` - Delete a user.

### Courses

#### `GET /courses` - Retrieve all courses.
#### `POST /courses` - Create a new course.
#### `GET /courses/{course_id}` - Retrieve details of a specific course.
#### `PUT /courses/{course_id}` - Update a course.
#### `DELETE /courses/{course_id}` - Delete a course.

### Faculties

#### `POST /faculties` - Create a new faculty.
#### `GET /faculties` - Retrieve all faculties.
#### `GET /faculties/{faculty_id}` - Retrieve details of a specific faculty.
#### `PUT /faculties/{faculty_id}` - Update a faculty.
#### `DELETE /faculties/{faculty_id}` - Delete a faculty.

### Sessions

#### `GET /sessions` - Retrieve all sessions.
#### `POST /sessions/{course_id}` - Add Session to Course
#### `GET /sessions/{session_id}` - Retrieve details of a specific session.
#### `PUT /sessions/{session_id}` - Update a session.
#### `DELETE /sessions/{session_id}` - Delete a session.

### Bookings

#### `GET /bookings` - Retrieve all bookings.
#### `POST /bookings` - Create a new booking.
#### `GET /bookings/{booking_id}` - Retrieve details of a specific booking.
#### `PUT /bookings/{booking_id}` - Update a booking.
#### `DELETE /bookings/{booking_id}` - Delete a booking.

### Enrollments

#### `GET /courses/{course_id}/enrollments` - Retrieve all enrollments for a course.
#### `POST /courses/{course_id}/enroll` - Enroll to a course.
#### `GET /courses/{course_id}/sessions` - Get enrolled sessions.
#### `DELETE /courses/{course_id}/enrollments/{enrollment_id}` - Delete Enrollment.

## Testing

Run unit tests:

```bash
npm test
```

Run integration tests:

```bash
npm run test:integration
```

Perform security testing:

```bash
# Perform security tests using OWASP ZAP
# Example command, please adjust as per your setup
zap-cli quick-scan --self-contained --start-options '-config api.key=your_api_key' --session my_session --spider 'https://your-api-url'

# Or use Burp Suite for manual security testing
```

Evaluate performance:

```bash
# Load test using artillery.io
# Example command, please adjust as per your setup
artillery run load-test.yml
```

## License

This project is licensed under the [MIT License](LICENSE).
