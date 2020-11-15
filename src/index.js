const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here
const fs = require('fs');
let doc = null;
fs.readFile('./InitialData.js', 'utf8' , (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    //   console.log(data);
    doc = data;
})


app.get("/api/student", (req, res) => {
    res.send(doc);
});

app.get('/api/student/:id', (req, res) => {
    let id = req.params.id;
    for(let obj in doc){
        if(obj.id === id){
            res.send(obj);
            return;
        }
    }
    res.status(404).send("id is invalid");
    return;
});

app.post("/api/student", (req, res) => {
    res.set("content-type", "application/x-www-form-urlencoded");
    let {name, currrentClass, division} = req.body;
    if(!name || !currrentClass || !division){
        res.status(400);
        return;
    }
    let obj = {
        id:doc.length+1,
        name:name,
        currentClass: currrentClass,
        division:division
    }
    doc.push(obj);
    res.send(obj.id);
});

app.put("/api/student/:id", (req, res) => {
    res.set("content-type", "application/x-www-form-urlencoded");
    let {name, currrentClass, division} = req.body;
    if(!name || !currrentClass || !division){
        res.status(400);
        return;
    }
    let flag = false;
    for(let obj in doc){
        if(obj.id === req.params.id)
            flag = true;
    }
    if(!flag){
        res.status(400);
        return;
    }
    let obj = {
        id:doc.length+1,
        name:name,
        currentClass: currrentClass,
        division:division
    }
    doc.push(obj);
    res.send(obj.id);
});

app.delete("/api/student/:id", (req, res) => {
    let id = req.params.id;
    let flag = false;
    let index = null;
    for(let obj in doc){
        if(obj.id === req.params.id){
            flag = true;
            index = doc.indexOf(obj);
        }
            
    }
    if(!flag){
        res.status(400);
        return;
    }
    doc.splice(index, 1);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   