const Postmodel = require("../Models/Postmodel");
module.exports.createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    const id = req.user;
    console.log(id);
    

    const post = await Postmodel.create({
      title: title,
      description: description,
      userId: id,
    });

    if (!post)
      return res.status(500).json({
        message: "Failed to create post",
      });

    res.status(200).json({
      message: "Post created successfully",
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error creating post",
      error: err,
    });
  }
};

module.exports.userPost = async (req, res) => {
  try {
    const id = req.user;
    const post = await Postmodel.find({ userId: id, isDeleted: false });
    if (!post)
      return res.status(500).json({
        message: "No posts found",
      });
    res.status(200).json({
      message: "Posts found",
      post: post,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error fetching posts",
      error: err,
    });
  }
};

module.exports.DeletePost = async (req, res) => {
  try {
    const id = req.user;
    
    
    const postId = req.params.id;
    const post = await Postmodel.findById(postId);
    if (!post)
      return res.status(500).json({
        message: "Post not found",
      });
    if (post.userId != id)
      return res.status(500).json({
        message: "You are not authorized to delete this post",
      });
    post.isDeleted = true;
    await post.save();
    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error deleting post",
      error: err,
    });
  }
};

module.exports.EditPost = async (req, res) => {
  try {
    const id = req.user;
    const postId = req.params.id;
    const post = await Postmodel.findById(postId);
    if (!post)
      return res.status(500).json({
        message: "Post not found",
      });
    if (post.userId != id)
      return res.status(500).json({
        message: "You are not authorized to edit this post",
      });
    post.title = req.body.title;
    post.description = req.body.description;
    await post.save();
    res.status(200).json({
      message: "Post updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error updating post",
      error: err,
    });
  }
};
