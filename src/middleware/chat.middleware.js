import jsend from 'jsend';

export const saveInstance = (instance, req, res, next) => {
  try {
    return next();
  } catch (error) {
    return res.status(400).send(
      jsend.error({
        message: error.message,
      }),
    );
  }
};

export const ips = (req, res, next) => {
  try {
    if (req.ip !== '::1') {
      next();
    } else {
      res.status(400).send(
        jsend.error({
          error: 'You are not allowed to access this page!',
        }),
      );
    }
  } catch (error) {
    res.status(500).send(
      jsend.error({
        error: 'Something went wrong on the server side!',
      }),
    );
  }
};
