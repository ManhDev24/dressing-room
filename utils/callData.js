import dataArray from "../data/Data.js";
export class clallData {
  callData = () => {
    return JSON.parse(JSON.stringify(dataArray));
  };
}
