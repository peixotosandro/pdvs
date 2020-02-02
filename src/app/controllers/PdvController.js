import Pdv from '../models/Pdv';

class PdvController {
  async store(request, response) {
    const { tradingName, ownerName, document } = await Pdv.create(request.body);

    return response.json({ tradingName, ownerName, document });
  }
}

export default new PdvController();
