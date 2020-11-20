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
let doc = require("./InitialData");
let idProp = doc.length;

app.get("/api/student", (req, res) => {
    res.send(doc);
});

app.get('/api/student/:id', (req, res) => {
    let id = req.params.id;
    for(let obj in doc){
        if(doc[obj]["id"] === parseInt(id)){
            res.send(doc[obj]);
            return;
        }
    }
    res.status(404).send("id is invalid");
    return;
});

app.post("/api/student", (req, res) => {
//     res.set("content-type", "application/x-www-form-urlencoded");
    const newStudent = req.body;
    if(!newStudent.name || !newStudent.currentClass || !newStudent.division){
        res.sendStatus(400);
        return;
    }

    doc.push({
        id: idProp+1,
        name: newStudent.name,
        currentClass: parseInt(newStudent.currentClass),
        division: newStudent.division
    });

    idProp++;
    
    res.send({
        id: idProp
    });
});

app.put("/api/student/:id", (req, res) => {
//     const id = parseInt(req.params.id);
//     if(isNaN(id)){
//         res.sendStatus(400);
//         return;
//     }
    
//     const index = doc.findIndex(student => student.id === id);
    
//     if(index === -1){
//         res.sendStatus(400);
//         return;
//     }
    
//     const student = doc[index];
//     if(req.body.name){
//         doc[index].name=req.body.name;
//     }
//     if(request.body.currentClass){
//         doc[index].currentClass=parseInt(req.body.currentClass);
//     }
//     if(request.body.division){
//         doc[index].division=req.body.division;
//     }
//     res.set("content-type", "application/x-www-form-urlencoded");
// //     res.send( {name:req.body.name});
//     res.send(req.body.name);
    
    
        const studentId = req.params.id;

    const student = doc.find(el => el.id === parseInt(studentId));
    

    if(!student){
        res.status(400).send();
        return;
    }
    else if(req.body.name){
        if(req.body.name.length === 0){
            res.status(400).send();
            return; 
        }
    }
    else if(req.body.currentClass){
        if(!Number.isInteger(req.body.currentClass)){
            res.status(400).send();
            return; 
        }
    }
    else if(req.body.division){
        if(!req.body.division.length === 1 || !req.body.division.match(/[A-Z]/)){
            res.status(400).send();
            return; 
        }
    }

    const studentIndex = studentArray.findIndex((el) => el.id === parseInt(studentId));

    const newStudent= {
        id: studentId,
        ...student,
        ...req.body
    }

    let classStudent = Number(newStudent.currentClass); 

    newStudent.currentClass = classStudent;

    doc.splice(studentIndex, 1, newStudent);

    //res.setHeader(['{"content-type":"application/x-www-form-urlencoded"}']);
    res.send(newStudent.name);
});

app.delete("/api/student/:id", (req, res) => {
    let id = req.params.id;
    let flag = false;
    let index = null;
    for(let obj in doc){
        if(doc[obj]["id"] === parseInt(id)){
            flag = true;
            index = obj;
        }
    }
    if(!flag){
        res.status(404).send("invalid id");
        return;
    }
    doc.splice(index, 1);
    res.send(doc);
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   
