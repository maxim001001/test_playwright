export interface IAuthRequest {
  email: string;
  password: string;
}

export const mockRequest = ({ email, password }: IAuthRequest): boolean => {
  const adminCredentials: IAuthRequest = {
    email: "admin@gmail.com",
    password: "12345",
  };
  return (
    email === adminCredentials.email && password === adminCredentials.password
  );
};
