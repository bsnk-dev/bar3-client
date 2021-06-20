export interface AnalyticalCampaign {
  sentCount: number;
  name: string;
  createdTime: number;
  links: Link[];
  messagePixel: Pixel;
  _id: string;
}

export interface Pixel {
  id: string;
  auth: string;
  readCount: number;
  readHistory: number[];
}

export interface Link extends Pixel {
  url: string;
}
