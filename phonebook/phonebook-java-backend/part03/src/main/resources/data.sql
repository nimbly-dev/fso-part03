-- Create the contacts table if it doesn't exist
CREATE TABLE IF NOT EXISTS contacts (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    number VARCHAR(255)
);

-- Insert the data
INSERT INTO contacts (id, name, number)
VALUES
    (1, 'Arto Hellas', '040-123456'),
    (2, 'Ada Lovelace', '39-44-5323523'),
    (3, 'Dan Abramov', '12-43-234345'),
    (4, 'Mary Poppendieck', '39-23-6423122');
