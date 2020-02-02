import * as Yup from 'yup';
import Pdv from '../models/Pdv';

class PdvController {
  async store(request, response) {
    const schema = Yup.object().shape({
      tradingName: Yup.string().required(),
      ownerName: Yup.string().required(),
      document: Yup.string()
        .matches(/[0-9]{13}\/[0-9]{4}/)
        .required(),
      coverageArea: Yup.array()
        .of(
          Yup.array().of(
            Yup.array()
              .min(3)
              .of(Yup.array().min(2))
          )
        )
        .required(),
      address: Yup.array()
        .min(2)
        .required(),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation error' });
    }

    const {
      tradingName,
      ownerName,
      document,
      coverageArea,
      address,
    } = request.body;

    if (await Pdv.findOne({ document })) {
      return response.status(401).json({ error: 'PDV already added.' });
    }

    const coverageAreaPrep = {
      type: 'MultiPolygon',
      coordinates: coverageArea,
    };

    const addressPrep = {
      type: 'Point',
      coordinates: address,
    };

    const { id } = await Pdv.create({
      tradingName,
      ownerName,
      document,
      coverageArea: coverageAreaPrep,
      address: addressPrep,
    });

    return response.json({
      id,
      tradingName,
      ownerName,
      document,
      coverageArea: coverageAreaPrep,
      address: addressPrep,
    });
  }
}

export default new PdvController();
