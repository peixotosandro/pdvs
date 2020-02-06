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
              .of(
                Yup.array()
                  .of(Yup.number())
                  .min(2)
              )
          )
        )
        .required(),
      address: Yup.array()
        .of(Yup.number())
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
      return response.status(400).json({ error: 'PDV already added.' });
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

    return response.status(201).json({
      id,
      tradingName,
      ownerName,
      document,
      coverageArea: coverageAreaPrep,
      address: addressPrep,
    });
  }

  async show(request, response) {
    const schema = Yup.object().shape({
      id: Yup.string()
        .matches(
          /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
        )
        .required(),
    });

    if (!(await schema.isValid(request.params))) {
      return response.status(400).json({ error: 'Validation error' });
    }

    const pdv = await Pdv.findOne({ id: request.params.id });
    if (!pdv) {
      return response.status(404).json({ message: 'PDV does not found.' });
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

export default new PdvController();
