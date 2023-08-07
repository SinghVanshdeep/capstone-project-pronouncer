import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";


const app = express();
const port = 3000;


const API_URL = "http://api.voicerss.org/";
const KEY = process.env.API_KEY;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set("view engine", "ejs");



app.get("/", async function(req, res){
    res.render("index.ejs", {content: null});

})

app.post("/", async function(req, res){
    const userData = req.body;
    const options = {
        method: "GET",
        url: API_URL,
        params: {
            key: KEY,
            src: userData.text,
            hl: userData.language,
            c: "mp3",
            b64: "true"
        }
    }
    try{
        const response = await axios.request(options);
        res.render("index.ejs", {content: response.data});
    }catch(error){
        console.log(error.message);
    }
});

app.listen(process.env.PORT || port, function(){
    console.log(`Server started on port: ${port}`);
})