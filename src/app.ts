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
app.get("/:name", async (req, res) => {
  try {

    let data;

    // const name = req.params.name
    // const age = parseInt(req.params.age)
    // data = await prisma.user.findUnique({
    //   where:{
    //     // email
    //     age_name:{
    //       age,
    //       name
    //     }
    //   }
    // })

    const name = req.params.name
    // data = await prisma.user.findFirst({
    //   where:{ name,}
     
    // })

    data = await prisma.user.findMany({
      where:{
        // name:{
        //   // equals:'hawsstrmido',
        //   // not:'hawsstrmido',
        //   // in:['hawsstrmido','hawmido']
        //   notIn:['hawsstrmido','hawmido']
        // },

        // name:'hawsstrmido',

        // age:{
        //   // lt:30
        //   // gt:34

        // }

        // email:{
        //   // contains:'@gmail.com',
        //   // endsWith:"co"
        //   startsWith:'goudaa'
        // }

        // AND:[
        //   {email:{startsWith:'goudaa'}},
        //   {name:'hamido'}
        // ]

        // AND:[
        //   {email:{startsWith:'goudaa'}},
        //   {email:{endsWith:'m'}}
        // ]

        // OR:[
        //   {email:{startsWith:'goudaa'}},
        //   {age:{gt:45}}
        // ]

        NOT:[
          {email:{startsWith:'goudaa'}},
          {age:{gt:45}}
        ]
        
      },
    })



    

    console.log(data);
    res.status(200).json({
      length: data.length,
      data
    });
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