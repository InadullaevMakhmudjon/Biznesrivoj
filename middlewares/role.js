export default (roleId) => (req, res, next) => {
  if (req.user.roleId === roleId) next();
  else res.status(400).json({ message: 'Not permitted' });
};
