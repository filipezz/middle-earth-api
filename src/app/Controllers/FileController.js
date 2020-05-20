import File from '../Models/File';

class FileController {
  async store(req, res) {
    const { originalname: name, filename: path } = req.file;

    const image = await File.create(name, path);

    return res.json(image[0]);
  }
}

export default new FileController();
