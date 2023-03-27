// Import app
const app = require('./app');

const PORT = process.env.PORT || 3000;

// Listen to port ( default: 3000 )
app.listen(PORT, () => {
  console.log('[Server] On');
});
