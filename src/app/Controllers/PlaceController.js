import Place from '../models/Place';
import File from '../models/File';
import * as Yup from 'yup'

class PlaceController {
  async store(req, res) {
    const schema = Yup.object().shape({

      name: Yup.string().required(),
      image_id: Yup.number().required()


    });

    if (!(await schema.isValid(req.body))) {
      const errors = await schema
        .validate(req.body, { abortEarly: false })
        .catch(err => {
          return err.errors;
        });
      return res.status(400).json(errors);
    }

    const { name, image_id } = req.body;
    const { userId } = req

    const { insertId } =  await Place.create(userId ,name, image_id);

    const place = await Place.getPlaceById(insertId)

    return res.json(place[0]);
  }

  async update(req, res) {
    const schema = Yup.object().shape({

      name: Yup.string(),
      image_id: Yup.number()


    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }
    const { place_id } = req.params
    const { userId } = req

    const place = await Place.getPlaceById(place_id)

    if(place.length===0){
      return res.status(400).json({error: "This place does not exists"})
    }
    if(!(place[0]?.user_id===userId)){
      return res.status(400).json({error:"This place was not registered by this user"})

    }


    if(req.body.image_id){

      const image = await File.getFileById(req.body.image_id)

      if(image.length===0){
        return res.status(400).json({error: "This image does not exists"})
      }
     await Place.updatePlace(place_id, req.body)
      const updatedPlace = await Place.getPlaceById(place_id)
    return res.json(updatedPlace[0])

    }




 await Place.updatePlace(place_id, req.body)

   const updatedPlace = await Place.getPlaceById(place_id)
    return res.json(updatedPlace[0])

  }

  async index(req, res) {
   const { userId } = req
    const places = await Place.getPlaces(userId)
    if(places.length===0){
      return res.status(400).json({error: "No places registered yet"})
    }
    return res.json(places);
  }

  async delete(req, res){
    const { place_id } = req.params
    const { userId } = req
    const place = await Place.getPlaceById(place_id)

    if(place.length===0){
      return res.status(400).json({error:"This place does not exists"})
    }
    if(!(place[0]?.user_id===userId)){
      return res.status(400).json({error:"This place was not registered by this user"})

    }
   await Place.deletePlace(place_id)
   return res.json({message: "Place deleted"})

  }
  async show(req, res){
    const { place_id } = req.params
    const { userId } = req
    const place = await Place.getPlaceById(place_id)
    if(place.length===0){
      return res.status(400).json({error: "This place does not exists"})
    }
    if(!(place[0]?.user_id===userId)){
      return res.status(400).json({error:"This place was not registered by this user"})

    }
    return res.json(place[0])
  }
}

export default new PlaceController();
