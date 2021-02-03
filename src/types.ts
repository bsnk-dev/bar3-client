import toRGBA from '@/utilities/toRGBA';

export interface Config {
  apiKey: string;
  messageSubject: string;
  messageHTML: string;
  updatePeriodMilliseconds: number;
  queueTime?: number;
  configVersion?: string;
}

export class Config implements Config {
  apiKey = '';
  messageSubject = '';
  messageHTML = '';
  updatePeriodMilliseconds = 0;
}

export interface Message {
  sentTimeMilliseconds: number;
  nation: NationAPICall.Nation;
  successful: boolean;
  error?: string;
}

export namespace NationAPICall {
  export interface ApiDetails {
      version: string;
      version_expiry: string;
      version_latest: boolean;
  }

  export interface ApiKeyDetails {
      api_key: string;
      nation_id: number;
      alliance_id: number;
      alliance_position: number;
      daily_requests_maximum: number;
      daily_requests_used: number;
      daily_requests_remaining: number;
      requests_per_second_rate_limit: number;
      requests_made_this_second: number;
  }

  export interface ApiRequest {
      success: boolean;
      error_msg?: string;
      api_details: ApiDetails;
      api_key_details: ApiKeyDetails;
  }

  export interface RootObject {
      api_request: ApiRequest;
      data: Nation[];
  }

  export interface Nation {
      nation_id: number;
      nation: string;
      leader: string;
      continent: number;
      war_policy: number;
      domestic_policy: number;
      color: number;
      alliance_id: number;
      alliance: string;
      alliance_position: number;
      cities: number;
      offensive_wars: number;
      defensive_wars: number;
      score: number;
      v_mode: boolean;
      v_mode_turns: number;
      beige_turns: number;
      last_active: string;
      founded: string;
      soldiers: number;
      tanks: number;
      aircraft: number;
      ships: number;
      missiles: number;
      nukes: number;
  }
}

export interface SideBarItem {
  title: string;
  icon: string;
  path: string;
}

export namespace VueLineChart {
  export const color = [
    'rgb(0, 123, 255)',
    'rgb(0, 125, 12)',
    'rgb(219, 0, 0)',
    'rgb(219, 106, 0)',
    'rgb(0, 0, 0)',
  ];
  
  export interface ChartData {
    labels: string[];
    datasets: Dataset[];
  }

  export class ChartData implements ChartData {
    labels: string[] = [];
    datasets: Dataset[] = [];
  }
  
  export interface Dataset {
    label: string;
    data: (number | string)[];
    borderColor: string;
    backgroundColor: string;
    fill: boolean;
    pointHitRadius: number;
    pointRadius: number;
  }

  export class Dataset implements Dataset {
    label = '';
    data: (number | string)[] = [];
    borderColor = color[0];
    backgroundColor = toRGBA(color[0], 0.3);
    fill = true;
    pointHitRadius = 5;
    pointRadius = 0;
  }
}
