import Pdv from '../models/Pdv';

class PdvController {
  async store(request, response) {
    const { id, tradingName, ownerName, document } = await Pdv.create(
      request.body
    );

    return response.json({ id, tradingName, ownerName, document });
  }
}

export default new PdvController();
