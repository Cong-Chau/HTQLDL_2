const express = require("express");
const exportController = require("../app/controllers/exportController.js");

const router = express.Router();

// Định tuyến
<<<<<<< HEAD
router.get("/export/api", exportController.GetInfos);

router.post("/api/create-export", exportController.createExport);
=======
router.get("/export/api",exportController.GetInfos);

router.post("/api/create-export",exportController.createExport);
>>>>>>> e56de7a173bce1a37b85169bd82c930fc74bb9ca

router.get("/export", exportController.renderExport);




module.exports = router;
