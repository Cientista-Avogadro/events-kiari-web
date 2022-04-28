import { uuid } from 'uuidv4';

type SignInRequestData = {
  email: string;
  password: string;
};

export const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount));
export async function signInRequest(data: SignInRequestData) {
  await delay();

  return {
    token: uuid(),
    user: {
      name: 'cientista avogadro',
      email: 'cientista@gmail.com',
      avatarUrl: 'https://github.com/cientista.png',
    },
  };
}

export async function recoverUserInformation() {
  await delay();

  return {
    user: {
      name: 'cientista avogadro',
      email: 'cientista@gmail.com',
      avatarUrl: 'https://github.com/cientista.png',
    },
  };
}
