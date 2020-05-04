import service from '../services/twilio';

export default {
  send(req, res) {
    service.verifications.create({
      to: req.phone,
      channel: 'sms',
    }).then(() => res.sendStatus(200))
      .catch(() => res.status(502).json({ message: 'Ooops, something wend wrong' }));
  },
  verify(req, res) {
    service.verificationChecks.create({
      to: req.phone,
      code: req.code,
    }).then(({ valid }) => {
      if (valid) res.status(200).json({ message: 'Successfully confirmed' });
      else res.status(401).json({ message: 'Code is not confirmed' });
    }).catch((err) => {
      let message = '';
      if (err.code === 60202) {
        message = 'You have tried more then 5 times, please again try later';
      } else {
        message = 'Ooops, something wend wrong';
      }
      res.status(502).json(message);
    });
  },
};
