const cors = require("cors");

module.exports = () => {
  if (process.env.NODE_ENV === "production") {
    // if the env is production accept cors only from prodapp.xyz
    const corsOptions = {
      origin: "https://prodapp.xyz",
      optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    };

    return cors(corsOptions);
  } else {
    // accept every request
    return cors();
  }
};
