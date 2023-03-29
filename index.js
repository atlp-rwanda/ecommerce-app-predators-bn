require('dotenv').config({ path: '.env' });



//require('dotenv').config();
const hostAdd = "127.168.0.1";
const dbName = "postgress";
const db_userName ="root";
const db_password ="1234";
const port = 8000;
if (process.env.DB_HOSTNAME !== hostAdd) {
    console.log("environment varible has changed");
} else{
    console.log("The environment variable has not changed");
}
//
if (process.env.DATABASE !== dbName) {
    console.log("environment varible has changed");
} else{
    console.log("The environment variable has not changed");
}
if (process.env.DB_USERNAME !== db_userName) {
    console.log("environment varible has changed");
} else{
    console.log("The environment variable has not changed");
}
if (process.env.DB_PASSWORD !== db_password) {
    console.log("environment varible has changed");
} else{
    console.log("The environment variable has not changed");
}
if (process.env.PORT != port) {
    console.log("environment varible has changed");
} else{
    console.log("The environment variable has not changed");
}