import {MongoClient, ServerApiVersion} from 'mongodb';
import {deleteFirebaseUser} from "@/server/utils/deleteFirebaseUser";
const uri = process.env.MONGODB_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// @ts-ignore
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export async function connectMongo() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    }
    catch (e){
        await deleteFirebaseUser();
        console.log("Connection Failed to MongoDB!");
    }
}

export async function disconnectMongo(){
    await client.close()
    console.log("You successfully disconnected to MongoDB!");
}

connectMongo().then()
export const db = client.db("wamflow");


