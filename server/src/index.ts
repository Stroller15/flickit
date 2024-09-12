import app from "./app";


const PORT:any = process.env.PORT 

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})