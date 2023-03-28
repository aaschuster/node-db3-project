const Schemes = require("./scheme-model");

const checkSchemeId = (req, res, next) => {
  const { scheme_id } = req.params;

  Schemes.findById(scheme_id)
    .then( scheme => {
      if(scheme) next();
      else next({ status: 404, message: `scheme with scheme_id ${scheme_id} not found`})
    })
    .catch(next);
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if(!scheme_name || typeof scheme_name !== "string")
    next( {
      status: 400,
      message: "invalid scheme_name"
    })
  else next();
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
