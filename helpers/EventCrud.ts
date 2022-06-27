import { api } from '../services/api';
import { ICardProps } from '../types/events.type';

const base = 'events/';

const getAllEvents = async () =>
  await api
    .get(base)
    .then(({ data }) => data)
    .catch(err => console.log({ err }));
const createNewEvent = async (client: ICardProps) =>
  await api.post(base, client).catch(err => console.log({ err }));
const deleteEvent = async (id: string) =>
  await api.delete(base.concat(id)).catch(err => console.log({ err }));
const editEvent = async (id: '' | string, newClientData: any) =>
  await api
    .put(base.concat(id), newClientData)
    .catch(err => console.log({ err }));

export { getAllEvents, createNewEvent, deleteEvent, editEvent };
