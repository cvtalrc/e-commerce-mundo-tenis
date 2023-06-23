const Comment = require('../Models/Comment');

// Controlador para crear un nuevo comentario
async function createComment(req, res) {
  const {Author,Content} = req.body;

  try {
    const newComment = await Comment.create({Author, Content});
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear el comentario:', error);
    res.status(500).json({ error: 'Error al crear el comentario' });
  }
}

// Controlador para obtener todos los comentarios
async function getAllComments(req, res) {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error('Error al obtener los comentarios:', error);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
}

// Controlador para eliminar un comentario
async function deleteComment(req, res) {
  const { id } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(id);
    res.status(200).json(deletedComment);
  } catch (error) {
    console.error('Error al eliminar el comentario:', error);
    res.status(500).json({ error: 'Error al eliminar el comentario' });
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
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error('Error al actualizar el comentario:', error);
    res.status(500).json({ error: 'Error al actualizar el comentario' });
  }
  
}

module.exports = {
  createComment,
  getAllComments,
  deleteComment,
  updateComment
};
