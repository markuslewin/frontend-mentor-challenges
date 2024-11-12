"use client";

import "leaflet/dist/leaflet.css";
import { type ComponentPropsWithoutRef } from "react";
import { MapContainer, TileLayer } from "react-leaflet";

type MapContainerProps = ComponentPropsWithoutRef<typeof MapContainer>;

interface MapProps extends Readonly<Pick<MapContainerProps, "center">> {
  className?: string;
}

export function Map({ className = "", center }: MapProps) {
  return (
    <MapContainer
      className={`${className}`}
      center={center}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}
