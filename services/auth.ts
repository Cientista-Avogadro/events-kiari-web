interface ISignIn {
  token: string;
  user: { name: string; email: string; avatarUrl: string };
}
export const delay = (amount = 750) =>
  new Promise(resolve => setTimeout(resolve, amount));
export async function signIn(): Promise<ISignIn> {
  await delay();
  return {
    token: '1111',
    user: {
      name: 'cientista avogadro',
      email: 'cientista@gmail.com',
      avatarUrl: 'https://github.com/cientista.png',
    },
  };
}
