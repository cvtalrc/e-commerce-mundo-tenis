const Comment = require('../Models/Comment');

// Controlador para crear un nuevo comentario
async function createComment(req, res) {
  const {Author,Content, Stars} = req.body;

  try {
    const newComment = await Comment.create({Author, Content, Stars});
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).send({
      message: "Error al crear el comentario",
      status: "error",
    });
  }
}

// Controlador para obtener todos los comentarios
async function getAllComments(req, res) {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json({
      comments: comments,
      status: "success",
    });
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).send({
      message: "Error al obtener los comentarios",
      status: "error",
    });
  }
}

// Controlador para eliminar un comentario
async function deleteComment(req, res) {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).send({message: "Comentario eliminado con éxito", status: "success" });
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).send({ message: 'Error al eliminar el comentario', status: "error" });
  }
}

async function updateComment(req, res){
  const { id } = req.params;
  const { Content } = req.body;
  const Time = Date.now();
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { Content: Content, createdAt: Time }
    );
    res.status(200).send({updateComment: updatedComment, status: "success"});
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).send({ message: 'Error al actualizar el comentario', status: "success" });
  }
  
}

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  updateComment
};
