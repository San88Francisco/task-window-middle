import { TabType } from "../types/TabType";
import { initialTabs } from "./constants";

const base64Encode = (data: string): string => btoa(unescape(encodeURIComponent(data)));
const CHARSET = '0123456789abcdefghijklmnopqrstuvwxyz';

export const encodeTabOrder = (tabs: TabType[]): string => {
  const bitFieldsStr = tabs
    .map(tab => (tab.selected ? 1 : 0) | (tab.pinned ? 2 : 0))
    .map(num => num.toString(2).padStart(2, '0'))
    .join('');

  const indicesStr = tabs
    .map(tab => initialTabs.findIndex(t => t.value === tab.value))
    .map(index => CHARSET[index])
    .join('');

  return base64Encode(bitFieldsStr + indicesStr);
};
