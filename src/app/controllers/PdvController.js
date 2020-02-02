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
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation error' });
    }

    if (await Pdv.findOne({ document: request.body.document })) {
      return response.status(401).json({ error: 'PDV already added.' });
    }

    const { id, tradingName, ownerName, document } = await Pdv.create(
      request.body
    );

    return response.json({ id, tradingName, ownerName, document });
  }
}

export default new PdvController();
