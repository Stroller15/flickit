import app from "./app.js";



const PORT:any = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`🟢🔴🟡 server is running on port ${PORT} 🟡🔴🟢`)
})