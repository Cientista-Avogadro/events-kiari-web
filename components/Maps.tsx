import { icon, latLng, LatLngExpression } from 'leaflet';
import { CSSProperties, useEffect, useState } from 'react';
import {
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useSelector } from 'react-redux';
import { IinitialProps } from '../store';

interface IProps {
  style?: CSSProperties;
}

const iconBullet = icon({
  iconUrl:
    'https://raw.githubusercontent.com/Cientista-Avogadro/fisgar-locator/main/src/assets/img/bullet.png',
  iconSize: [30, 30],
});

export const Maps = ({ style }: IProps) => {
  const { currentCard } = useSelector((state: IinitialProps) => state);
  const [pos, setPos] = useState<any>();
  const selected: LatLngExpression = [
    Number(currentCard?.latitude),
    Number(currentCard?.longitude),
  ];

  useEffect(() => {
    navigator.geolocation.watchPosition(({ coords }) => {
      setPos([coords.latitude, coords.longitude]);
    });

    console.log(pos);
  }, [navigator]);

  return (
    <MapContainer center={pos} zoom={13} style={style}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=wqJUQrlJwUVH8qGo4NK4'
      />
      {pos && (
        <Marker position={pos} icon={iconBullet}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};
