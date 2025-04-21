interface Conf {
  httpTimeout?: number;
  generalMessageTimeout?: number;
}

export const AppConfig: Conf = {
  httpTimeout: 30000,
  generalMessageTimeout: 3000,
};
