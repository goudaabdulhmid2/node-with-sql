import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from 'morgan';

import config from "./config/config";
const app = config.getApp();
const prisma = new PrismaClient({log:['query']});


app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({ extended:true , limit:'100mb'}));

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.post('/', async (req,res)=>{
  try{
  const {email,name,age,emailUpdates} = req.body;
  // prisma.user,createMany([])
  const newUser = await prisma.user.create({
    data:{
       name,
       email,
       age,
       UserPreference:{
        create:{
          emailUpdates
        }
       },     
  },
  // include:{
  //   UserPreference:true
  // },
  select:{
    // u either use the select or include
    name:true,
    UserPreference:{
      select:{
        id:true
      }
    }
  }
}) 

  console.log(newUser);

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

app.delete('/',async (req,res)=>{
  try{
    await prisma.user.deleteMany();
    res.status(204).json({
      status: 'success',
      data: null,
    })
  }catch(err){
    console.log(err);

  }
})