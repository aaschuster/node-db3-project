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

const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;

  if(!scheme_name || typeof scheme_name !== "string")
    next( {
      status: 400,
      message: "invalid scheme_name"
    })
  else next();
}

const validateStep = (req, res, next) => {

  const { instructions, step_number } = req.body;

  if (!instructions || 
    typeof instructions !== "string" ||
    step_number < 1 ||
    typeof step_number !== "number" ) 
  {
    next({
      status: 400,
      message: "invalid step"
    })
  }
  else next();
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
