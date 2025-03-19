import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from 'morgan';

import config from "./config/config";
const app = config.getApp();
const prisma = new PrismaClient();
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended:true , limit:'100mb'}));

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.post('/', async (req,res)=>{
  try{
  const {email,name} = req.body;
  const newUser = await prisma.user.create({
    data:{
      email,
      name
  }}) 

  res.status(201).json({
    message:'done',
    data:{
      newUser
    }
  })
  }catch(err){
    console.log(err);
  }
})
app.get("/", async (req, res) => {
  try {
    const data = await prisma.user.findMany()
    res.json(data);
  } catch (err) {
    console.log(err);
  }
});
