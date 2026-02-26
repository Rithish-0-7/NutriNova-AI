import { Router } from 'express';
import multer from 'multer';
import { coachChat, scanMeal, workoutProgram } from '../controllers/ai.controller.js';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});

const router = Router();

router.post('/scan-meal', upload.single('image'), (req, res, next) => {
  if (!req.file) return next();

  const formData = new FormData();
  const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
  formData.append('image', blob, req.file.originalname);
  formData.append('user_goal', req.body.user_goal || 'maintenance');

  req.forwardFormData = formData;
  req.forwardHeaders = {};
  next();
}, scanMeal);

router.post('/workout-program', workoutProgram);
router.post('/coach-chat', coachChat);

export default router;
