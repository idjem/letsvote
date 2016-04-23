"use strict";

const path     = require("path");
const fs       = require("fs");
const has      = require("mout/object/has");
const keys     = require("mout/object/keys");
const unset    = require("mout/object/unset");
const dataPath = "data";


class Vote {

  constructor(){
    this.data = {} ;
  }

  getDataPath(){
    return path.join(dataPath, "data.json");
  }

  save(){
    var data = JSON.stringify(this.data);
    fs.writeFileSync(this.getDataPath() , data);
  }

  load(){
    var data = {};
    try{
      fs.accessSync(getDataPath() , fs.R_OK | fs.W_OK);
      let d = fs.readFileSync(getDataPath());
      data = JSON.parse(d);
    }catch(e){
      console.log("cant access data");
    }
    return data;
  }

  for(field, candidateId){
    if(!field || !candidateId)
      return false;
    if(!has(this.data , field + "." + candidateId))
      return false;
    this.data[field][candidateId]["score"] = this.data[field][candidateId]["score"] || 0;
    this.data[field][candidateId]["score"]++;
    return true;
  }

  createCandidate(field , candidate){
    if(!this.data[field])
      return console.warn("field not exist");
    if(!candidate || candidate.id)
      return console.warn("condidate must have id");

    if(has(this.data , field + "." + candidate.id))
      return console.warn("condidate allrady exist");

    this.data[field][candidate.id] = {info : candidate};
  }

  reset(){
    this.data = {};
  }

  resetField(field){
    return unset(this.data, field);
  }

  getAllFiled(){
    return keys(this.data);
  }

  getCandidates(field){
    return keys(this.data[field] || {})
  }

  getRanck(field , candidate){
    //todo implement this methode
  }

};

module.exports = Vote;