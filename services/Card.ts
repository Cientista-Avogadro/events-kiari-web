import {v4 as uuidv4} from 'uuid';

const party =
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

export interface ICardProps {
    id: string
    title: string
    description: string
    localization: string
    state: 'public' | 'private'
    type: string
    latitude: number
    longitude: number
    managementWays: 'card' | 'money'
    accountDetails: string
    price: string
    data: string
    img: string
    click: boolean
    yesterday: number[]
    today: number[]
}

export const cardDatas: ICardProps[] = [
    {
        id: uuidv4(),
        title: 'kill himself',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sint!',
        localization: 'luanda, cacuaco',
        state: 'public',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'bai',
        price: '2000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [20, 20, 15, 36, 12, 15]
    },
    {
        id: uuidv4(),
        title: 'kill yourself',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sint!',
        localization: 'luanda, cacuaco',
        state: 'public',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'bai',
        price: '2000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [20, 20, 15, 36, 12, 15]
    },
    {
        id: uuidv4(),
        title: 'kill themself',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien urna, phasellus est urna. Euismod sed pellentesque egestas senectus varius id ornare fusce vel. Sagittis velit eget fringilla dictum fringilla posuere proin aliquam ridiculus. Volutpat diam porta leo nisl sed adipiscing. Blandit risus tellus nunc quis. Adipiscing a mi orci viverra feugiat vitae fringilla lorem. Ac id gravida volutpat enim tempus. Congue tristique nisl nunc ac pellentesque. ',
        localization: 'luanda, cacuaco',
        state: 'public',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'bai',
        price: '2000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [20, 20, 15, 36, 12, 15]
    },
    {
        id: uuidv4(),
        title: 'kill herself',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sint!',
        localization: 'luanda, cacuaco',
        state: 'private',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'bic',
        price: '15000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [20, 20, 15, 36, 12, 15]
    },
    {
        id: uuidv4(),
        title: 'kill itself',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sint!',
        localization: 'luanda, cazenga',
        state: 'private',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'sol',
        price: '5000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [20, 20, 15, 36, 12, 15]
    },
    {
        id: uuidv4(),
        title: 'kill ourself',
        description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel, sint!',
        localization: 'luanda, cacuaco',
        state: 'private',
        type: 'House Part',
        latitude: -245465456456,
        longitude: 5154684684,
        managementWays: 'card',
        accountDetails: 'bai',
        price: '10000kz',
        data: '2020-01-01',
        img: party,
        click: false,
        yesterday: [10, 20, 15, 16, 12, 35],
        today: [10, 20, 15, 16, 12, 35]
    },
];