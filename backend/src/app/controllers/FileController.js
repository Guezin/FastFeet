import File from '../models/File';

class FileController {
  static async store(req, res) {
    const { originalname: name, filename: path } = req.file;
    const files = await File.create({ name, path });

    return res.json(files);
  }
}

export default FileController;
