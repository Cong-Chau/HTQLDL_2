const express = require("express");
const searchController = require("../app/controllers/searchController.js");
const router = express.Router();

// api
<<<<<<< HEAD
router.get("/search/api", searchController.rederSearch);

//reder
router.get("/search", searchController.index);
=======
router.get("/search/api",searchController.rederSearch);


//reder
router.get("/search", searchController.index);


>>>>>>> e56de7a173bce1a37b85169bd82c930fc74bb9ca

module.exports = router;
