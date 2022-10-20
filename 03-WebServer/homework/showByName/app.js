const fs  = require("fs");
const http  = require("http");

// Escribí acá tu servidor
http
    .createServer((req, res) => {
        const name = req.url.slice(1);
        console.log(name);
        const files = fs.readdirSync("./images");

        for(const file of files){
            if(file.includes(name)){
                res.writeHead(200, {"Content-type": "image/jpg"});
                const img = fs.readFileSync(`./images/${name}_doge.jpg`);
                res.end(img);
            
        }
    }
    
}).listen(3001, "localhost");


