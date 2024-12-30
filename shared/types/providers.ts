type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type TMDbProvider = {
  results: Record<string, Providers>;
};

export type Providers = {
  link: string;
  flatrate: Provider[];
  rent: Provider[];
  buy: Provider[];
};
