import expressApp from './expressApp';

const PORT = process.env.APP_PORT || 8000;

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