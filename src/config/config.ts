import express, { Application } from "express";
import { Server } from "http";
import pool from "./db";

class Config {
  private readonly PORT: number = Number(process.env.PORT) || 3000;
  private readonly app: Application = express();
  private static instance: Config | null = null;
  private server: Server | null = null;

  private constructor() {
    // Private constructor to enforce singleton pattern
    /**
        - Prevent Direct Instantiation : By making the constructor private, it prevents other parts of the code from creating new instances using new Config() . This enforces that the only way to get an instance is through the getInstance() method.
        - Control Instance Creation : Without a private constructor, TypeScript/JavaScript would create a default public constructor, allowing anyone to create multiple instances.
    */
  }

  public static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  public getApp(): Application {
    return this.app;
  }

  public getPort(): number {
    return this.PORT;
  }

  private listenAsync(): Promise<Server> {
    return new Promise((resolve, reject) => {
      try {
        this.server = this.app.listen(this.PORT, () => {
          resolve(this.server as Server);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  public async runApp(): Promise<void> {
    try {
      await this.listenAsync();
      console.log(`Server is running on port ${this.PORT}`);
      await pool.connect();
      console.log("Connected to the PostgreSQL database");
    } catch (error) {
      console.error(`Error running the application:`, error);
      process.exit(1);
    }
  }

  public async stopApp(): Promise<void> {
    if (this.server) {
      await new Promise<void>((resolve, reject) => {
        this.server?.close((err) => {
          if (err) reject(err);
          resolve();
        });
      });
    }
  }
}

export default Config.getInstance();

/**
 * Key concepts used in this code:

1. Singleton Pattern : The code ensures only one instance of the server configuration exists using the getInstance method.
2. Environment Variables : Uses dotenv to load configuration from a .env file (like port numbers, database credentials, etc.)
3. Express : A web framework for Node.js that makes it easier to create web servers
4. Promises : Used in listenAsync to handle asynchronous server startup
5. Error Handling : Uses try-catch blocks to handle potential errors gracefully
6. Readonly Properties : PORT and app are marked as readonly to prevent accidental changes
This code creates a configuration setup for an Express web server with proper error handling and environment variable support
 */
