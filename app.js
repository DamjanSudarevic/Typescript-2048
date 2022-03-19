import express from 'express';
const app = express();
app.use(express.static("public"));
app.get('/', (req, res) => {
    res.send('Well done!');
});
app.listen(8080, () => {
    console.log('The application is listening on port 8080!');
});
