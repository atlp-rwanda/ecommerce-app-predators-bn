import app from './app.js';
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000;

// Listen to Port ( default: 3000 )
app.listen(PORT, () => {

if (process.env.NODE_ENV =="test"){
    console.log("I am in "+ process.env.NODE_ENV + " environment")

}
else if(process.env.NODE_ENV =="development"){
    console.log("I am in "+ process.env.NODE_ENV + " environment")
}
else{
    console.log("I am in "+ process.env.NODE_ENV + " environment")

}

  console.log(`[Server@${PORT}] On`);
});
