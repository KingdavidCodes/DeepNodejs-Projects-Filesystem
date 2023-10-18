const express = require("express");
const router = express.Router();

// Movies controller
const { getMovies, getAllMoviesStatic,  } = require("../controllers/movies");

router.get("/", getMovies);
router.get('/static', getAllMoviesStatic)


// router.post("/", createMovies);

module.exports = router;
