import app from "./server.js";
import mongodb from "mongodb";
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient = mongodb.MongoClient;
const mongo_username = process.env["MONGO_USERNAME"];
const mongo_password = process.env["MONGO_PSWRD"];
// console.log(mongo_password, mongo_username)
 
const uri = "mongodb+srv://archikumari074:6GATBQXk8oup6iSB@cluster0.wgsonpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const port = 8000;


const client = new MongoClient(uri);
MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .then(async (client) => {
    await ReviewsDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
