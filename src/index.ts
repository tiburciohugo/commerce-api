import app from "./server";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3001;


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} -> http://localhost:${PORT}`);
});