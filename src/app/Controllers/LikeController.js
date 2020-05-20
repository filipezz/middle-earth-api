import Place from '../Models/Place';

class LikeController {
  async update(req, res) {
    const { place_id } = req.params;

    const place = await Place.getPlaceById(place_id);

    if (place.length === 0) {
      return res.status(400).json({ error: 'This place does not exists' });
    }

    await Place.addLikes(place_id);

    const updatedPlace = await Place.getPlaceById(place_id);
    return res.json(updatedPlace[0]);
  }
}
export default new LikeController();
