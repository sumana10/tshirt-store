exports.errormsg = (res, msg) =>{

  return res.status(400).json({
    error: msg
  });

}