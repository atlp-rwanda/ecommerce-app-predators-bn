import { Router } from 'express';

const router = Router();

<<<<<<< HEAD
router.use((req, res) => {
  if (req.accepts('html')) {
    res.status(200).send(req.t('welcome_message'));
  } else if (req.accepts('json')) {
    res.json({ message: req.t('welcome_message') });
  } else {
    res.type('txt').send(req.t('welcome_message'));
  }
=======
router.get('/', (req, res) => {
  res.send('Welcome to the API');
>>>>>>> 012ffa8 (add)
});

export default router;

