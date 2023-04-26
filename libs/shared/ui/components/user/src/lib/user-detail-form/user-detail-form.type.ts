/**
 * Describes the structure of the input, which the UserDetailFormComponent expects.
 */
export interface UiUserDetailFormInput {
  id: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  secondName: string;
  phone: string;
  gender: string;
  birthdate: string;
  Salutation: {
    id: string;
  };
  Title: {
    id: string;
  };
  Address: {
    id: string;
    streetName: string;
    postalCode: string;
    location: string;
    Country: {
      id: string;
    };
  };
}
