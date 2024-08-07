require("dotenv").config();
// MySQL imports - Use mysql
import mysql from "";
// PostgreSQL imports Use postgres

// SQLite3 imports - Use better-sqlite3

// MongoDB imports - Use mongoose as the ORM

// Redis imports - Use redis or @redis/client

/**
 * Considerations for other databases:
 * Firebase, Supabase, NocoDB, Airtable, MariaDB, CouchDB, Apache Cassandra, RethinkDB,
 */

/**
 * Considerations for DEV and PROD
 * See below link for a more professional approach
 * https://stackoverflow.com/questions/55406055/toggle-between-multiple-env-files-like-env-development-with-node-js
 */
const isProd = process.env.NODE_ENV === "PRODUCTION";

const MYSQL_URL = isProd
  ? process.env.PROD_MYSQL_URL
  : process.env.DEV_MYSQL_URL;
const PG_URL = isProd
  ? process.env.PROD_PG_URL
  : process.env.DEV_PG_URL;
const MONGODB_URL = isProd
  ? process.env.PROD_MONGODB_URL
  : process.env.DEV_MONGODB_URL;
const REDIS_URL = isProd
  ? process.env.PROD_REDIS_URL
  : process.env.DEV_REDIS_URL;

/**
 * Function to connect to MySQL
 */
async function connectToMySQL(PORT = 3306) {
 if (!MYSQL_URL) {
  console.log("MySQL connection string is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to MySQL on port: ${PORT}`);
  } catch (error) {
    console.log(`MySQL Error: ${error}`);
  }
}

/**
 * Function to connect to PostgreSQL
 */
async function connectToPostgreSQL(PORT = 3306) {
 if (!PG_URL) {
  console.log("PostgreSQL connection string is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to PostgreSQL on port: ${PORT}`);
  } catch (error) {
    console.log(`PostgreSQL Error: ${error}`);
  }
}

/**
 * Function to connect to SQLite3
 */
async function connectToSQLite3() {
 if (!SQLITE_PATH) {
  console.log("SQLite3 connection path is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to SQLite3 from: ${path}`);
  } catch (error) {
    console.log(`SQLite3 Error: ${error}`);
  }
}

/**
 * Function to connect to MongoDB Locally
 */
async function connectToMongoDBLocal(PORT = 27017) {
 if (!MONGODB_URL) {
  console.log("MongoDB connection string is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to MongoDB on port: ${PORT}`);
  } catch (error) {
    console.log(`MongoDB Local Error: ${error}`);
  }
}

/**
 * Function to connect to MongoDB Atlas
 */
async function connectToMongoDBAtlas() {
 if (!MONGODB_URL) {
  console.log("MongoDB connection string is not defined.")
  return;
 }
 // TODO
  try {
    console.log(`Connected to MongoDB Atlas`);
  } catch (error) {
    console.log(`MongoDB Atlas Error: ${error}`);
  }
}

/**
 * Function to connect to Redis Locally
 */
async function connectToRedisLocal(PORT = 6379) {
 if (!REDIS_URL) {
  console.log("Redis connection string is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to Redis on port: ${PORT}`);
  } catch (error) {
    console.log(`Redis Local Error: ${error}`);
  }
}

/**
 * Function to connect to Redis Cloud
 */
async function connectToRedisCloud() {
 if (!REDIS_URL) {
  console.log("Redis connection string is not defined.")
  return;
 }
  // TODO
  try {
    console.log(`Connected to Redis Cloud`);
  } catch (error) {
    console.log(`Redis Cloud Error: ${error}`);
  }
}

/**
 * Notes regarding MongoDB performance: Local vs Atlas
 * https://stackoverflow.com/questions/64274976/mongodb-atlas-database-vs-mongodb-local-which-is-best-for-saas-in-terms-of-tran
 *
 *
 *
 *
 *
 *
 *
 */

/**
 * Connect to all the databases you're using in your project
 * */
const connectToDatabases = async () => {
  // await connectToMongoDB();
  // await connectToMySQL();
  // await connectToPostgreSQL();
  // await connectToSQLite3();
};

// connectToDatabases();
