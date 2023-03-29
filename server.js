// Import app
import app from './app';

const PORT = process.env.PORT || 3000;

// Listen to port ( default: 3000 )
app.listen(PORT, () => {
  console.log(`[Server@${PORT}] On`);
});
