import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const API_URL = "https://api.lyrics.ovh/v1/";
app.use(bodyParser.urlencoded({
    extended: true
  }));

let data;

app.use(express.static(__dirname + '/public'));
app.use(express.json());



app.get("/", (req, res) => {
    res.render("index.ejs", {lyrics: data});
});

app.post ("/", async (req, res)=>{
     try {
        console.log("Request Body:", req.body);
        const artist = encodeURIComponent(req.body.artist);
        const title = encodeURIComponent(req.body.title);

        const apiUrl = `${API_URL}${artist}/${title}`;
        console.log("API URL:", apiUrl);

        const response = await axios.get(apiUrl);
        
        const result = response.data;
        res.render("index.ejs", {
            lyrics: result,
            
          });
        
     } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: "No lyrics found.",
    });
        
     }
  });
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  