import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

import config from "./config/config";
const app = config.getApp();
const prisma = new PrismaClient();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/", async (req, res) => {
  try {
    const { email, name, age, emailUpdates } = req.body;
    // prisma.user,createMany([])
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        age,
        UserPreference: {
          create: {
            emailUpdates,
          },
        },
      },
      // include:{
      //   UserPreference:true
      // },
      select: {
        // u either use the select or include
        name: true,
        UserPreference: {
          select: {
            id: true,
          },
        },
      },
    });

    console.log(newUser);

    res.status(201).json({
      message: "done",
      data: {
        newUser,
      },
    });
  } catch (err) {
    console.log(err);
  }
});
app.get("/:name", async (req, res) => {
  try {
    let data;
    /*
    data = await prisma.user.findMany({
      // where:{
      //  UserPreference:{
      //   emailUpdates:true
      //  }
      // },
      // include:{
      //   UserPreference:{
      //     select:{
      //       emailUpdates:true
      //     }
      //   }}
      
      where:{
       writtenPosts:{
        // every:{
        //   title:'test' // is every single post in that this person writtren, start with the title of test?
        // }

        // none:{
        //   title:'test' // has this user written no post
        // }

        some:{
          title:{startsWith:'test'} // do any of thir titles start with test
        }
       }
       },

    })

*/
    data = await prisma.post.findMany({
      where: {
        author: {
          is: {
            age: 43,
          },
        },
      },
    });

    console.log(data);
    res.status(200).json({
      length: data.length,
      data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/", async (req, res) => {
  try {
    await prisma.user.deleteMany();
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
});
