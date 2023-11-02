const url = require('url');

const notFound = (req, res, next) => {
  const url_string = url.parse(req.url, true);
  const route = url_string.pathname

  res.status(404).json({
    message: 'Not found',
    url: `${route}`
  })
}

module.exports = notFound