export enum DAType {
  Text,
  Image,
}

export interface DAConfig {
  type: DAType;
  url?: string;
}
export function createCanvas(config: DAConfig) {
  if (config.type == DAType.Image && config.url == undefined) {
    throw Error("url is empty !");
  }
}
