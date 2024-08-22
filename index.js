import express from "express";
import bodyParser from "body-parser";
import { validationForm } from "./middleware/formValidate.js";

const app = express();
const port = 3000;
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({ extended: true }));

let posts=[];

app.get("/",(req,res)=>{
  res.render("index.ejs", { posts: posts });
})

app.get("/create",(req,res)=>{
    res.render("creationPost.ejs",{ error: null })
})


app.post("/create/submit", validationForm, (req, res) => {
  const { title, comments } = req.body;
  const id = Date.now().toString(); 
  posts = [...posts, { id, title, comments }];
  res.redirect("/");
});


app.get("/options", (req, res) => {
  res.render("editDelete.ejs", { posts: posts });
});


/* edit */
app.get("/edit/:index", (req, res) => {
  const index = parseInt(req.params.index, 10);

  if (isNaN(index) || index < 0 || index >= posts.length) {
    res.redirect("/");
  }

  const data = posts[index];
  res.render("edit.ejs", { post: data });
});


app.post("/edit/submit", validationForm, (req, res) => {
  const { title, comments, postId } = req.body;
  const postIndex = posts.findIndex(p => p.id == postId);
  if (postIndex !== -1) {
      posts[postIndex] = { id: postId, title:title, comments:comments };
  }
  res.redirect("/");
});


/* delete */
app.post("/delete/:index", (req, res) => {
  const postIndex = parseInt(req.params.index);
   posts.splice(postIndex, 1); 
  
  res.redirect("/options");
});

  



app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
