<<<<<<< HEAD
// Import app
import app from './app';

const PORT = process.env.PORT || 3000;

// Listen to port ( default: 3000 )
app.listen(PORT, () => {
  console.log(`[Server@${PORT}] On`);
});
=======
const express = require('express');
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

<<<<<<< HEAD


const PORT = process.env.PORT || 8080;
i18next
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init({
        backend: {
            loadPath: __dirname + '/resources/locales/{{lng}}/{{ns}}.json'
        },
        fallbackLng: 'en',
        preload: ['en', 'es']
    });
=======
i18next.use(Backend)
.use(middleware.LanguageDetector)
.init({
    fallbackLng: 'en',
    backend:{
        loadPath: './locales/{{lng}}/translation.json'
    }
})
>>>>>>> 3e8ee56 (update configuration unneccessary codes removed)
const app = express();
app.use(middleware.handle(i18next));
app.use(express.json());


<<<<<<< HEAD
app.get('/greeting', (req, res) => {
    const response = req.t('greeting');
    res.status(200);
    res.send(response);
});
app.listen(PORT, () => {
    console.log(`[Server@${PORT}] On`);
  });
>>>>>>> 4d652f1 (start up)
=======

app.listen(4000, () => console.log('Example app listening on port 4000!'));
>>>>>>> 3e8ee56 (update configuration unneccessary codes removed)
