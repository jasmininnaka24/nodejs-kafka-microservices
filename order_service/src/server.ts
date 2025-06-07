import expressApp from './express-app';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

const startServer = async () => {
    expressApp.listen(PORT, () => {
        console.log(`Listening to port ${PORT}`);
    })

    process.on("uncaughtException", async (err) => {
        console.log(err);
        process.exit(1);
    })
}

startServer().then(() => {
    console.log("server is up");
})