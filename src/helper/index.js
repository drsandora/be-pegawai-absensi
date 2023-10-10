const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const {
  APP_SECRET,
  TEMP_SECRET
} = require("../config");

module.exports.FormateData = (data) => {
    if (data) {
      return { data };
    } else {
      throw new Error("Data Not found!");
    }
  };

//Raise Events
module.exports.PublishPostUser = async (payload) => {
  const res = axios.post("http://localhost:8000/app-events", {
    payload,
  });
};

module.exports.PublishGetUser = async (payload) => {
  await axios.post('http://localhost:8000/app-events', { payload })
  .then(response => {
    result = response.data.data; 
  })
  .catch(error => {
    console.log(error.message)
    result = {}
  });
  return result;
};

module.exports.PublishUpdatePassword = async (payload) => {
  await axios.post('http://localhost:8000/app-events', { payload })
  .then(response => {
    result = response.data.data; 
  })
  .catch(error => {
    console.log(error.message)
    result = {}
  });
  return result;
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature)
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    return false;
  }
};