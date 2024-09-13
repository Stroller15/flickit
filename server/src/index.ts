import app from "./app";



const PORT:any = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`🟢🔴🟡 server is running on port ${PORT} 🟡🔴🟢`)
})