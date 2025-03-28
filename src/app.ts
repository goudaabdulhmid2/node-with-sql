import express from "express";
import { PrismaClient } from "@prisma/client";
import morgan from "morgan";

import config from "./config/config";
import { create } from "domain";
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
app.get("/:id", async (req, res) => {
  try {
    let data;

    data = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        UserPreference: {
          select: {
            emailUpdates: true,
          },
        },
      },
    });

    // data = await prisma.post.findMany({
    //   where: {
    //     author: {
    //       is: {
    //         age: 43,
    //       },
    //     },
    //   },
    // });

    console.log(data);
    res.status(200).json({
      data,
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    // await prisma.user.deleteMany();
    // res.status(204).json({
    //   status: "success",
    //   data: null,
    // });

    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        UserPreference: true,
      },
    });

    if (user?.UserPreference) {
      await prisma.userPreference.delete({
        where: {
          id: user.UserPreference.id,
        },
      });
    }

    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log(err);
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { email, emailUpdates } = req.body;
    let user = await prisma.user.findUnique({
      where: { id },
      include: { UserPreference: true },
    });
    let data;

    // await prisma.user.updateMany({date:{}, where:{}})
    data = await prisma.user.update({
      where: {
        id,
      },
      data: {
        UserPreference: user?.UserPreference
          ? { update: { emailUpdates } }
          : { create: { emailUpdates } },
      },
      include: {
        UserPreference: {
          select: {
            emailUpdates: true,
          },
        },
      },
    });

    res.status(200).json(data);
  } catch (err) {}
});
