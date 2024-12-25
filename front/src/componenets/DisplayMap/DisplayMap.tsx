import React from 'react'
import { MapContainer, TileLayer, useMap, Popup, Marker } from 'react-leaflet'
import { IMarker } from '../../Types'

interface PropType {
  height: string
  markers: IMarker[]
}

interface ChangeCenterProps {
  position: { lat: number; lng: number };
}
const ChangeCenter: React.FC<ChangeCenterProps> = ({ position }) => {
  const map = useMap();
  map.flyTo(position);
  return <></>;
};

export default function DisplayMap({markers, height}: PropType) {
  const center = markers.length ? markers[0].location : [51.505, -0.09] as [number, number]
  return (
    <MapContainer style={{height: height}} center={center} zoom={13} scrollWheelZoom={false}>
      <ChangeCenter position={{lat: center[0], lng: center[1]}}></ChangeCenter>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {markers.map((marker, i) => {
     return (<Marker position={marker.location} key={i}>
      <Popup>
        {marker.areaName }  {
          marker.messages.map((message, i) => {
            return < span key={i}> <br />  {message} </span>
          })
        }
      </Popup>
    </Marker>)
  })
  }
</MapContainer>
  )
}
