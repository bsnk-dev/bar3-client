export interface AnalyticalCampaign {
  sentCount: number;
  name: string;
  createdTime: number;
  links: (null)[] | null;
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
