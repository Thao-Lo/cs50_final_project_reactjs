# Booking Management System

## Video Demo
https://www.youtube.com/watch?v=4Rftsw34ACk
## Technologies Used

### Backend
- **Java Spring Boot**: REST APIs framework.
- **JPA and Hibernate**: ORM for database interactions.
- **MySQL**: Relational database deployed using Docker.
- **Redis and Redisson**: For distributed locking and session management.
- **JWT**: Authentication and authorization.
- **Spring Mail**: For email notifications.
- **JUnit and Bcrypt**: Testing and secure password hashing.
- **Flyway**: For database migration and schema versioning.

### Frontend
- **ReactJS**: Frontend library for building user interfaces.
- **Material-UI**: Pre-styled UI components and responsive design. 
- **Axios, Cookies, Leaflet, Stripe**: For API calls, session handling, map integration, and payment processing.

---

## Description

### Purpose
- Inspired by fine-dining restaurant booking systems.
- Consolidates my knowledge and skills in full-stack development, including REST APIs, relational databases, and frontend frameworks.

### Part A: User Booking Features
This system allows users to book a restaurant reservation with the following features:
- **Slot Selection**:
  - **Capacity**: Between 1 and 6 people.
  - **Time**: Default options include 5:30 PM, 6:30 PM, 7:30 PM, and 8:30 PM (customizable on the server side).
  - **Date**: Up to 30 days from the current date. Users can select dates using a calendar view for an intuitive and user-friendly experience.
- **Reservation Process**:
  - **Logged-In Users** (Guest role):
    - Redirected to review booking details, view a map of the restaurant, and complete payment via Stripe.
    - Slots are held for 5 minutes. If payment is successful, a confirmation email is sent.
  - **Non-Logged-In Users**:
    - Redirected to login or register a new account.
    - Slots are held for 5 minutes, and users proceed to confirm the reservation upon successful login.

### Part B: Admin Dashboard
For users with an **Admin role**, the dashboard offers the following:
- **Read-Only Access**:
  - View data for seats, schedules, and slots.
- **Data Management**:
  - Manage user roles (e.g., assign Admin or Guest).
  - Update booking statuses (e.g., Booked or Cancelled).
- **Insights**:
  - A bar chart displays the total bookings per table to date.

---

## Frontend and Backend Communication
The frontend communicates with the backend via REST APIs to:
- Fetch available slots, seating, and schedules.
- Handle booking creation, updates, and confirmation.
- Authenticate users with JWT and manage sessions using cookies.
- Process payments securely through Stripe.

---

## Files in the Project

### Backend (`cs50-final`)
- **src/main/java/...**:
  - **Controller**: Handles REST API requests.
  - **Entity**: Maps database tables using Hibernate.
  - **DTO**: Filters and structures data for the client.
  - **Repository**: JPA interactions with the database.
  - **Service**: Implements business logic.
  - **Security**: Configures authentication, authorization, and CORS.
  - **Redis**: Configures Redis and Redisson.
  - **Utils**: Includes Stripe config, data cleanup schedules, exception handling, JWT utilities, etc.
- **resources/db/migration**: Stores Flyway migration scripts.
- **test/java/...**: Contains mock tests for email, user, and JWT services.

### Frontend (`cs50-reactJs`)
- **src/component/...**:
  - For users: Components for login, registration, slot selection, reservation details, and countdown timer.
  - For admins: Components for managing tables, users, reservations, and displaying charts.
- **src/hooks/...**: Manages global state for users and reservations.
- **src/pages/...**: Contains all pages (home, login, booking, reservations, admin dashboard, etc.).
- **src/services/...**: Handles API calls using Axios.
- **src/static/...**: Includes CSS and images.
- **src/stripe/...**: Contains Stripe payment components and context.

### Deployment (`cs50-deployment`)
- **Dockerfile**: Configures MySQL container.
- **/data**: Stores MySQL volume data.

---

## Design Choices
- **Full-Stack Development**: Combines backend REST APIs, relational database, and ReactJS frontend.
- **JWT**: Implements access and refresh tokens for user authentication and role-based authorization.
- **Redis**: Stores and locks booking slots temporarily for 5 minutes, ensuring quick and reliable access.
- **Redisson**: Prevents race conditions when multiple users attempt to reserve the same slot.
- **Bcrypt**: Secures user passwords with strong hashing and salting.
- **Stripe**: A trusted platform for handling secure online payments.

---

## Features and Functionality
- **Slot Holding**: Booking slots are locked for 5 minutes. If a user changes their slot, the previous one is released. Slots are also released if the booking process exceeds 5 minutes.
- **Timezone Conversion**: Displays dates and times in Sydney/Australia timezone (UTC+11 or UTC+10 depending on DST).
- **Email Notifications**:
  - Email validation is required for registration using a UUID code.
  - Sends confirmation emails with reservation details after successful payment.
- **Responsive Design**:
  - The application is fully responsive, providing an optimized experience across devices, including desktops, tablets, and mobile phones.
- **Future Enhancements**:
  - Backend: Add OAuth, H2 testing, and integrity tests.
  - Frontend: Implement code splitting and lazy loading for improved performance.