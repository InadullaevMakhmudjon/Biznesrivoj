import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
const service = client.verify.services(process.env.TWILIO_SERVICE_ID);

export { service as default };
