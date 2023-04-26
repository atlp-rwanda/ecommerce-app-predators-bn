// Import app
import app from "./app.js";

const PORT = process.env.PORT || 3000;
// Listen to Port ( default: 3000 )
app.listen(PORT, () => {
    console.log("I am in "+ process.env.NODE_ENV + " environment")
    console.log(`[Server@${PORT}] On`);
});
