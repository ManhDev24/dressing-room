import dataArray from "../data/Data.js";
export class callData {
  callData = () => {
    return JSON.parse(JSON.stringify(dataArray));
  };
}
