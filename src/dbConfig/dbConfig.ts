import mongoose from "mongoose";

export async function connect() {
    try {
        //ts way works
        // if (process.env.MONGO_URI) {
            //     mongoose.connect(process.env.MONGO_URI)
        // }

        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Mongo db connected")
        })

        connection.on("error", (err) => {
            console.log("MongoDb connection error , please make sure db is up and running: " + err);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong in connecting to db");
        console.log(error);
    }
}