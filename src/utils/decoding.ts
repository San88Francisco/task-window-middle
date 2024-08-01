import { TabType } from "../types/TabType";
import { initialTabs } from "./constants";

const base64Decode = (data: string): string => decodeURIComponent(escape(atob(data)));
const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyz';

export const decodeTabOrder = (encodedOrder: string): TabType[] => {
  const decoded = base64Decode(encodedOrder);

  const length = initialTabs.length;
  const bitFieldsStr = decoded.slice(0, length * 2);
  const indicesStr = decoded.slice(length * 2);

  const bitFields = Array.from({ length: length }, (_, i) =>
    parseInt(bitFieldsStr.slice(i * 2, i * 2 + 2), 2),
  );

  const indices = Array.from(indicesStr).map(char => CHARSET.indexOf(char));

  const tabs = initialTabs.slice();

  indices.forEach((index, i) => {
    if (index < tabs.length) {
      tabs[index] = {
        ...tabs[index],
        selected: (bitFields[i] & 1) === 1,
        pinned: (bitFields[i] & 2) === 2,
      };
    }
  });

  return indices.map(index => tabs[index]);
};
