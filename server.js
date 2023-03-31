// Import App
import app from './app.js'

const PORT = process.env.PORT || 3000;

// Listen to Port ( default: 3000 )
app.listen(PORT, () => {
  console.log(`[Server@${PORT}] On`);
});
