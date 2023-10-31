const notFoundHandlers = (req, res, next) => {
  res.status(404).json({
    title: "Not Found",
    url: `Not found url ${req.url}`
  })
}


module.exports = notFoundHandlers