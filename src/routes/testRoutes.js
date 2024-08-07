import express from "express"
import getTestEndpoint from "../handlers/test.controller.js";

const router = express.Router();

router
 .route("/test")
 .get(getTestEndpoint)

export { router as testRouter }
