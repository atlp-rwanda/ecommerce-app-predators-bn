// Imports
import { Router } from 'express';

// Initialization
const router = Router();

router.use((req, res) => {
  if (req.accepts('html')) {
    res.status(200).send('Welcome to the Ecommerce RESTful API!');
  } else if (req.accepts('json')) {
    res.json({ message: 'Welcome to the Ecommerce RESTful API!' });
  } else {
    res.type('txt').send('Welcome to the Ecommerce RESTful API!');
  }
});

export default router;
