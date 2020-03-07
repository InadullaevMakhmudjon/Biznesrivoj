export async function exists(model, object, invert) {
  const param = Object.keys(object)[0];
  const units = (await model.findAll({ attributes: [param], raw: true }))
    .map((unit) => unit[param]);
  const result = units.includes(object[param]);
  return invert ? !result : result;
}

export default '';
