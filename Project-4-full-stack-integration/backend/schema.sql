CREATE DATABASE IF NOT EXISTS intern_app;
USE intern_app;

CREATE TABLE IF NOT EXISTS interns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  batch VARCHAR(20) NOT NULL,
  status ENUM('active', 'completed') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data (optional)
INSERT INTO interns (name, email, batch, status) VALUES
('Aisha Khan', 'aisha@example.com', '2026', 'active'),
('Bilal Ahmed', 'bilal@example.com', '2026', 'active');
