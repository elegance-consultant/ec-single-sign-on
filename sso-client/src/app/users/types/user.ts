export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  enabled: boolean;
  attributes: {
    DateOfBirth: string[];
    addr_PostCode: string[];
    addr_District: string[];
    Telephone: string[];
    addr_Province: string[];
    addr_Address: string[];
    NationalIDCard: string[];
    Gender: string[];
    addr_SubDistrict: string[];
  };
  createdTimestamp: number;
  totp: boolean;
  disableableCredentialTypes: string[];
  requiredActions: string[];
  notBefore: number;
  access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };
}


export interface UserFormData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  enabled: boolean;
  attributes: {
    DateOfBirth: string[];
    addr_PostCode: string[];
    addr_District: string[];
    Telephone: string[];
    addr_Province: string[];
    addr_Address: string[];
    NationalIDCard: string[];
    Gender: string[];
    addr_SubDistrict: string[];
  };
}
