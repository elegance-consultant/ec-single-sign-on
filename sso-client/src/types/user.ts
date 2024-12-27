export interface User {
  attributes: {
    [key: string]: string[];
  };
  [key: string]: string | boolean | number | number[] | string[] | attributes | access | credentials;
};

interface attributes {
  [key: string]: string[];
};

interface access {
  [key: string]: boolean;
};

interface credentials {
  [key: string]: string;
};
