import express from "express";
const PORT = process.env.PORT || 8080;

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT} -> http://localhost:${PORT}`);
});

export default app;
