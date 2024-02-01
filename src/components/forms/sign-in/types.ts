export type Inputs = {
  email?: string;
  password?: string;
};

export interface ISigninForm {
  onSubmitHandler: (values: Inputs) => void;
  errorMessage?: string;
}
