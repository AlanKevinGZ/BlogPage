function avoidDuplicatePost(posts) {
    return (req, res, next) => {
        const { title } = req.body;
        const postExists = posts.some(post => post.title.trim().toLowerCase() === title.trim().toLowerCase());
        
        if (postExists) {
            return res.render("creationPost.ejs", { error: "A post with this title already exists" });
        }
        
        next();
    };
}

export { avoidDuplicatePost };
