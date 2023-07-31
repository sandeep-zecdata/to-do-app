// const connect = require('../database/db');
const { ObjectId } = require('mongodb');
const tasks = require("../models/tasks")

exports.postTask = async (req, res) => {
    // const db = await connect();
    //   const data = {
    //     bookname: "Expressjs",
    //     author: "unknown",
    //   }
    // await db.collection('book').insertOne(req.body);
    // res.status(201).json({ data: "book is stored" });

    // const { title, author } = req.body

    // const task = new tasks({
    //     title,
    //     author
    // })
    const {task,user_id} = req.body;
  
    const newtask = new tasks({
        task,
        user_id
    })

    try {
        await newtask.save();
        res.status(201).send({ message: "task added successfully " });
    } catch (error) {
        console.log(error._message)
        res.send(error._message);
    }
}

exports.getuserTasks = async (req, res) => {
    // const db = await connect();
    // const books = await db.collection("book").find().toArray();
    // res.send("All books");
    const _id =  req.params.id;
    console.log(_id);
    const alltasks = await tasks.find({user_id : _id });
    res.status(200).json(alltasks);
}

exports.getallTasks = async (req, res) => {
    // const db = await connect();
    // const books = await db.collection("book").find().toArray();
    // res.send("All books");

    const alltasks = await tasks.find();
    res.status(200).json(alltasks);
}

exports.getsingleTask = async (req, res) => {
    const _id = new ObjectId(req.params.id);
    const book = await tasks.find({ _id })
    res.send(book);
    // const db = await connect();
    // await db.collection("book").findOne({ _id }).then((book) => {
    //     // console.log("data:", book);
    //     if (!book) {
    //         return res.status(404).send({ message: "book not Exist." });
    //     }
    //     res.send(book);
    // }).catch((error) => {
    //     res.status(500).send(error);
    // })
    // console.log(books);
}

exports.updateTask = async (req, res) => {

    const _id = new ObjectId(req.params.id);
    await tasks.updateOne({ _id }, { $set: req.body })
    res.json({message:"task is updated"});
    // try {
    //     const _id = new ObjectId(req.params.id);
    //     const db = await connect();
    //     console.log(_id);

    //     await db.collection("book").updateOne({ _id }, { $set: req.body });

    //     res.json({ data: "book is updated" });
    // } catch (error) {
    //     console.error("Error updating book:", error);
    //     res.status(500).json({ error: "Error updating book" });
    // }
}

exports.deleteTask = async (req, res) => {
    const _id = new ObjectId(req.params.id);
    await tasks.deleteOne({ _id })
    res.json({message:"task is deleted"});

    // try {
    //     const _id = new ObjectId(req.params.id);
    //     const db = await connect();
    //     console.log(_id);

    //     await db.collection("book").deleteOne({ _id });
    //     res.json({ data: "book is deleted" });
    // } catch (error) {
    //     console.error("Error deleting book:", error);
    //     res.status(500).json({ error: "Error deleting book" });
    // }
}