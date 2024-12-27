export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  attributes: Attributes;
  createdTimestamp: number;
  enabled: boolean;
  totp: boolean;
  disableableCredentialTypes: string[];
  requiredActions: number[];
  notBefore: number;
  access: Access;
  credentials: Credentials;
  [key: string]: string | boolean | number | Attributes | Access | Credentials | number[] | string[];
};

export interface Attributes {
  DateOfBirth: string[];
  Telephone: string[];
  addr_Province: string[];
  addr_Address: string[];
  Gender: string[];
  addr_PostCode: string[];
  addr_District: string[];
  NationalIDCard: string[];
  addr_SubDistrict: string[];
  [key: string]: string[];
};

export interface Access {
  manageGroupMembership: boolean;
  view: boolean;
  mapRoles: boolean;
  impersonate: boolean;
  manage: boolean;
};

export interface Credentials {
  type: string;
  value: string;
  temporary: string;
};