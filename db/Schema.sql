
CREATE TABLE events (

  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INT CHECK (capacity > 0 AND capacity <= 1000) NOT NULL

);

 

CREATE TABLE users (

  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,

  email VARCHAR(100) UNIQUE NOT NULL

);




CREATE TABLE registrations (

  user_id INT REFERENCES users(id) ON DELETE CASCADE, 

  event_id INT REFERENCES events(id) ON DELETE CASCADE,
  PRIMARY KEY (user_id, event_id)

);
