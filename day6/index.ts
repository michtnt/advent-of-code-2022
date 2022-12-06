import { readFileSync } from "fs";
import * as path from "path";

export const getFirstPacketMarkerFromSignalData = (): number => {
  const PACKET_SIZE = 4;

  const data = parseSignalDataToString();
  let answer = 0;

  for (let i = 0; i < data.length; i++) {
    let uniqueSequence = [...new Set(data.slice(i, i + PACKET_SIZE))];

    if (uniqueSequence.length === PACKET_SIZE) {
      answer = i + PACKET_SIZE;
      break;
    }
  }

  return answer;
};

export const getFirstMessageMarkerFromSignalData = (): number => {
  const MESSAGE_SIZE = 14;

  const data = parseSignalDataToString();
  let answer = 0;

  for (let i = 0; i < data.length; i++) {
    let uniqueSequence = [...new Set(data.slice(i, i + MESSAGE_SIZE))];

    if (uniqueSequence.length === MESSAGE_SIZE) {
      answer = i + MESSAGE_SIZE;
      break;
    }
  }

  return answer;
};

/** utils */
export const parseSignalDataToString = () => {
  return readFileSync(path.join(__dirname, "./input.txt")).toString();
};

console.log("first packet marker", getFirstPacketMarkerFromSignalData());
console.log("first message marker", getFirstMessageMarkerFromSignalData());
