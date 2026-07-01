import "dotenv/config"
import app from "./app.js"
import { connectDB } from "./config/db.js"
import { connectVectorDB } from "./config/vector.js";


async function serverConnection() {
  try {
    await Promise.all([
      connectDB(),
      connectVectorDB()
    ]);
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening at port ${process.env.PORT}`);
      
    })

    
  } catch (error) {
    console.log("connection failed");
    
  }
}

serverConnection()