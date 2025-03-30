const app = require('./app.js')
const ConnectToMongo = require('./config/db.js')


// handling uncaught exception
process.on("uncaughtException",()=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to uncaught exception")

    server.close(()=>{
        process.exit(1);
    })
})

const port = process.env.PORT;

// connecting to database
ConnectToMongo();

// creating server
const server = app.listen(port,()=>{
    console.log(`Backend Server is working on http://localhost:${port}`);
})

// handling unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`)
    console.log("Shutting down the server due to unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1);
    })
})