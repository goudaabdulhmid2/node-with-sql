import express from "express";

import config from "./config/config";
import pool from "./config/db";

const app = config.getApp();

app.get("/", async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM products");

    res.json(data.rows);
  } catch (err) {
    console.log(err);
  }
});
