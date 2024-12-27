type Provider = {
  logo_path: string;
  provider_id: number;
  provider_name: string;
  display_priority: number;
};

export type Providers = {
  results: Record<
    string,
    {
      link: string;
      flatrate: Provider[];
      rent: Provider[];
      buy: Provider[];
    }
  >;
};
