const validate = (roleId) => (req, res, next) => {
  if (req.user.role.id !== roleId) next();
  else res.status(400).json({ message: 'Not permitted' });
};

export const isNotUser = validate(3);

export default isNotUser;
