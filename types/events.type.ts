export interface ICardProps {
    id: string;
    title: string;
    description: string;
    localization: string;
    state: 'public' | 'private';
    type: string;
    latitude: number;
    longitude: number;
    managementWays: 'card' | 'money';
    accountDetails: string;
    price: string;
    data: string;
    img: string;
    click?: boolean;
    yesterday?: number[];
    today?: number[];
    buyied?: 'pago' | 'em análise' | 'pendente';
  }