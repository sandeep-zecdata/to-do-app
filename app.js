const express = require("express");
const path = require("path"); 
const connectDB = require("./app/database/db")
var bodyParser = require('body-parser')
const tasksController = require("./app/Controllers/Taskcontroller");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const authController = require("./app/Controllers/Authcontroller");
const test = require("./app/middleware/test")
var cors = require('cors')
app.use(cors())
 
app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "./index.html"));
    // res.json({data:"TO-dos-app"});
})


app.post("/user_signup", authController.signup);
app.post("/user_login", authController.login);
// app.get("/books", tasksController.getallTasks)

app.post("/task", tasksController.postTask);

app.get("/user_tasks/:id", tasksController.getuserTasks)

app.get("/tasks", tasksController.getallTasks)

app.get("/book/:id", tasksController.getsingleTask)

app.patch("/update_task/:id", tasksController.updateTask)

app.delete("/delete_task/:id", tasksController.deleteTask)


app.all('/*', (req, res) => {
    res.send("Page Not Found");
})

connectDB().then(() => {

    app.listen(3000, () => {
        console.log("server running on http://localhost:3000");
    })
})



