export interface User {
  attributes: Attributes;
  access: Access;
  credentials: Credentials;
  [key: string]: string | boolean | number | number[] | string[] | Attributes | Access | Credentials;
};

interface Attributes {
  [key: string]: string[];
};

interface Access {
  [key: string]: boolean;
};

interface Credentials {
  [key: string]: string;
};
