export type User = {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    emailVerified: boolean;
    attributes?: UserAttributes;
    createdTimestamp: number;
    enabled: boolean;
    totp: boolean;
    disableableCredentialTypes: any[];
    requiredActions: any[];
    notBefore: number;
    access: {
        manageGroupMembership: boolean;
        view: boolean;
        mapRoles: boolean;
        impersonate: boolean;
        manage: boolean;
    };
  };

  interface UserAttributes {
    DateOfBirth: string[];
    Telephone: string[];
    addr_Province?: string[];
    addr_Address?: string[];
    Gender?: string[];
    addr_PostCode?: string[];
    addr_District?: string[];
    NationalIDCard?: string[];
    addr_SubDistrict?: string[];
    [key: string]: string[]; // Allow for other attributes
  }