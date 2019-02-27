module.exports = async function (req, res, next) {
  if (!req.user) return res.redirect('/account/login')

  await next()
}
