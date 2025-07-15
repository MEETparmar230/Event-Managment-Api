# Event Management API

A RESTful backend API for managing events and users, built with Node.js, Express, and PostgreSQL.

## 📌 Features

- Create, read, update, and delete events
- User management
- Input validation and error handling
- PostgreSQL integration using `pg` and `pool`
- Environment configuration using `dotenv`

## 🚀 Technologies Used

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client for Node)
- dotenv
- nodemon (for development)


## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-api.git
cd event-management-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a .env file in the root directory:
```bash
PORT=8080
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```
Replace with your actual DB credentials.


### 4. Start the Server

```bash
node server.js
```

## 🗃️ API Endpoints

1. Create Event

POST /events

Body:
```bash
{
  "title": "Node Meetup",
  "date_time": "2025-08-01T10:00:00",
  "location": "Delhi",
  "capacity": 100
}
```
2. Get Event Details

GET /events/:id

Returns event info and list of registered user IDs.

3. Register for Event

before this create user with id 101 manualy

POST /events/:id/register

Body:
```bash
 { "user_id": 101 }
```

4. Cancel Registration

DELETE /events/:id/cancel

Body:
```bash
 { "user_id": 101 }
```

5. Upcoming Events

GET /events/upcoming/all

Returns list of future events sorted by date (asc) and location (asc).


6. Event Stats

GET /events/:id/stats

Response:
```bash
{
  "total": 55,
  "remaining": 45,
  "used": "55%"
}
```


## 🧪 Testing
Use tools like Postman or Thunder Client to test the endpoints.


## 🧑‍💻 Author

Meet Parmar