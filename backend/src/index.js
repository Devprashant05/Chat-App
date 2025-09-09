import app from "./app.js";


const port = process.env.PORT || 5500

app.listen(port, (req, res) => {
    console.log(`Server is running on port: ${port}`);
});
