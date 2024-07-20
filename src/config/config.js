const PORT = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = {
 PORT,
 MONGODB_URL
};

// // TYPESCRIPT CONVERSION
// import { config } from "process";

// const PORT = process.env.PORT || 3000;
// const { MONGODB_URL } = process.env;

// export { PORT, MONGODB_URL }