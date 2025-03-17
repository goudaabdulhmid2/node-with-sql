import express from "express";

import config from "./config/config";
import pool from "./config/db";
const app = config.getApp();

app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended:true , limit:'100mb'}));


app.post('/', async (req,res)=>{
  // Insert a team
  await pool.query(`
    INSERT INTO Team (name, city, coach) 
    VALUES ('Maple Leafs', 'Toronto', 'Sheldon Keefe');
  `);

  // Insert a player (who will be the captain)
  const playerRes = await pool.query(`
    INSERT INTO Player (name, position, skill_level, team_id) 
    VALUES ('Auston Matthews', 'Center', 95, 'Maple Leafs') 
    RETURNING player_id;
  `);
  const captainId = playerRes.rows[0].player_id;

  // Update team with captain
  await pool.query(`
    UPDATE Team SET captain_id = $1 
    WHERE name = 'Maple Leafs';
  `, [captainId]);

  // Insert another player
  await pool.query(`
    INSERT INTO Player (name, position, skill_level, team_id) 
    VALUES ('Mitch Marner', 'Right Wing', 90, 'Maple Leafs');
  `);

  // Insert an injury record
  await pool.query(`
    INSERT INTO InjuryRecord (injury_type, date, player_id) 
    VALUES ('Sprained Ankle', '2025-01-15', $1);
  `, [captainId]);

  // Insert another team
  await pool.query(`
    INSERT INTO Team (name, city, coach) 
    VALUES ('Canadiens', 'Montreal', 'Martin St-Louis');
  `);

  // Insert a game
  await pool.query(`
    INSERT INTO Game (date, score, host_team_id, guest_team_id) 
    VALUES ('1999-05-11', '4 to 2', 'Maple Leafs', 'Canadiens');
  `);

  res.status(201).json({
    message:'done'
  })
})
app.get("/", async (req, res) => {
  try {
    const teams = await pool.query('SELECT * FROM Team');

    const players = await pool.query('SELECT * FROM Player');

    const games = await pool.query('SELECT * FROM Game');

    const data ={
      teams:teams.rows,
      players:players.rows,
      games:games.rows,
    }

    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
