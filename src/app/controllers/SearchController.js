import * as Yup from 'yup';
import Pdv from '../models/Pdv';

class SearchController {
  async show(request, response) {
    const schema = Yup.object().shape({
      lng: Yup.number().required(),
      lat: Yup.number().required(),
    });

    if (!(await schema.isValid(request.query))) {
      return response.status(400).json({ error: 'Validation error' });
    }

    const { lng, lat } = request.query;

    const pdv = await Pdv.findOne({
      coverageArea: {
        $geoIntersects: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        },
      },
      address: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat],
          },
        },
      },
    });

    if (!pdv) {
      return response
        .status(200)
        .json({ message: 'There are no registered partners in your area.' });
    }

    const { id, tradingName, ownerName, document, coverageArea, address } = pdv;

    return response.json({
      id,
      tradingName,
      ownerName,
      document,
      coverageArea,
      address,
    });
  }
}

export default new SearchController();
