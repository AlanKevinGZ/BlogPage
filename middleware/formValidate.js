function validationForm(req,res,next) {
    let {title,comments}=req.body;

    if (title.trim()==="" || comments.trim()==="") {
        return res.render("creationPost.ejs", { error: "Title and comments are required" });
    }
    next();
}

export{
    validationForm
}