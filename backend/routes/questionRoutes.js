const express = require("express");
const {togglePinQuestion,updateQuestionNote,addQuestionstoSession}= require('../controllers/questioncontroller');
const {protect} = require('../middlewares/authmiddleware');
const router = express.Router();

router.post("/add",protect,addQuestionstoSession);

router.post('/:id/pin',protect,togglePinQuestion);

router.post('/:id/note',protect,updateQuestionNote);

module.exports = router;