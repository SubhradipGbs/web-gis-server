const dataMiddleware = (req, res, next) => {
  const originalSend = res.send;

  res.send = function (data) {
    let modifiedData = data;
    if (typeof data === "object") {
      modifiedData = {
        ...data,
        customProperty: "This is a custom property",
      };
    }

    originalSend.call(this, modifiedData);
  };
  next();
};

module.exports = dataMiddleware;
