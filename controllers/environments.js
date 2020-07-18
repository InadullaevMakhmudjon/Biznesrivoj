import credentials from '../credentials';

export default {
  get: (req, res) => {
    const result = {};
    Object.keys(req.body).forEach((pkey) => {
      const keys = Object.keys(req.body[pkey]);
      if (keys.length) {
        keys.forEach((key) => { Object.assign(result, { [pkey]: { [key]: credentials[pkey][key] } }); });
      } else { Object.assign(result, { [pkey]: credentials[pkey] }); }
    });
    res.status(200).json(result);
  },
};
