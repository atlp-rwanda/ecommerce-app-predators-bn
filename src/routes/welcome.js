import { Router } from 'express';

const router = Router();

router.use((req, res) => {
  if (req.accepts('html')) {
    res.status(200).send(res.json(req.t('welcome_message')));
  } else if (req.accepts('json')) {
    res.json(req.t('welcome_message'));
  } else {
    res.type('txt').send({
      message:req.t('welcome_message')
    });
  }
});

export default router
