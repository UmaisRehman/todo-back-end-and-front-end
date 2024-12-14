import express from 'express';
import cors from 'cors';


const app = express()
const port = 3000


app.use(cors())
app.use(express.json());



const arr = [];

app.get("/", (req, res) => {
    res.send("<h1>hello world</h1>")
})

// add todo
app.post("/todo", (req, res) => {
    
    const { title } = req.body

    console.log('request executed')

    if (!title) return res.status(404).json({
        message: "title is required"
    })

    const obj = {
        title,
        id: Date.now()
    }

    arr.push(obj)

    res.json({
        message: "todo added successfully",
        todo: obj
    })

})




//get 

app.get("/todo", (req, res) => {
    res.json({
        message: "all todos",
        todos: arr
    })
})



//delete
app.delete("/todo/:id", (req, res) => {
    const {id} = req.params
    const index = arr.findIndex((item)=> item.id === +id);
    if(index === -1) return res.status(404).json({
        message: 'no todo found'
    })
    arr.splice(index, 1)
    
    res.json({
   message:"deleted successful"
    })
})





//edit
app.put("/todo/:id", (req,res)=>{
    const {id} = req.params
    const {title} = req.body;

    if(!title) return res.status(404).json({
        message: 'updated title is required'
    })

    const index = arr.findIndex((item)=> item.id === +id);
    
    if(index === -1) return res.status(404).json({
        message: 'please chose valid todo'
    })

    arr[index].title = title;

    res.json({
        message:"edit successful"
    })
})







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})