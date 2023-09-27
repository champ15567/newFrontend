export interface ResLoginAndRegisterUsers {
  status: string;
  message: string;
  token: string;
  profile: {
    fName: string;
    lName: string;
    tel: string;
    email: string;
    gender: string;
    bDate: string;
  };
}

export interface ResEditUser {
  status: string;
  message: string;
  user: {
    username: string;
    email: string;
    role: string;
  };
}

export interface ResProductsData {
  status: string;
  message: string;
  products: {
    code: string;
    name: string;
    series: string;
    description: string;
    type: "computer" | "electrical appliance" | "accessories" | "other";
  };
}

export interface ResEditProduct {
  status: string;
  message: string;
  products: {
    code: string;
    name: string;
    series: string;
    description: string;
    type: "computer" | "electrical appliance" | "accessories" | "other";
  };
}
