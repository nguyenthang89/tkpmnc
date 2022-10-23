export const customRes = (req, res , next, dataRes) => {
  if(dataRes){
    return res.status(200).json(dataRes);
  }else{
    return res.status(404).json({
      data: null,
      success: false,
      message: "Failed!!",
      
    });
  }
  return next()
};