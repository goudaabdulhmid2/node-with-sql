-- Create Team Table
CREATE TABLE Team (
    name VARCHAR(50) PRIMARY KEY,
    city VARCHAR(50) NOT NULL ,
    coach VARCHAR(50) NOT NULL,
    captain_id INT UNIQUE
);

-- Create Player Table
CREATE TABLE Player(
    player_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    position VARCHAR(50) NOT NULL,
    skill_level INT NOT NULL,
    team_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (team_id) REFERENCES Team(name)
);

-- Add foreign key for captain after Player table exists
ALTER TABLE Team 
ADD CONSTRAINT fk_captain
FOREIGN KEY (captain_id) REFERENCES Player(player_id);

-- Create Game Table
CREATE TABLE Game(
    game_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    score VARCHAR(10) NOT NULL,
    host_team_id VARCHAR(50) NOT NULL,
    guest_team_id VARCHAR(50) NOT NULL,
    FOREIGN KEY (host_team_id) REFERENCES Team(name),
    FOREIGN KEY (guest_team_id) REFERENCES Team(name),
    CHECK (host_team_id != guest_team_id) -- Ensure teams are different

);

-- Create InjuryRecord table
CREATE TABLE InjuryRecord (
    injury_id SERIAL PRIMARY KEY,
    injury_type VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    player_id INTEGER NOT NULL,
    FOREIGN KEY (player_id) REFERENCES Player(player_id)
);

