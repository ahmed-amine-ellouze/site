const express=require("express")
const dotenv=require("dotenv")
const mongoose=require("mongoose")
const cors=require("cors")
const app=express()
app.use(cors({
    origin:'*'
}))
/*app.use(cors({
    origin:'http://localhost:3000'
}))*/
//middleware
app.use(express.json())
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter=require('./routes/scategorie.route')
const articleRouter=require('./routes/article.route')
dotenv.config()
app.get("/",(req,res)=>{
    res.send("page accueil")
})
app.get("/contact",(req,res)=>{
    res.send("page contact")
})

// Connexion à la base données
mongoose.connect(process.env.DATABASECLOUDAMINE,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
    .then(() => {console.log("Connexion à la base de données réussie");
   }).catch(err => {
    console.log('Impossible de se connecter à la base de données', err);
    process.exit();
   });
app.use("/api/categories",categorieRouter)
app.use("/api/scategories",scategorieRouter)
app.use("/api/articles",articleRouter)
app.listen(process.env.PORT)
console.log("application executée sur le port " + process.env.PORT)
module.exports = app;