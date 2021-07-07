import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { icon } from "leaflet";

const locationIcon = icon({
	iconUrl: "/location-pin.png",
	iconSize: [16, 16],
});

const Map = ({ countryMonth }) => {
	return (
		<MapContainer
			center={[countryMonth.Lat, countryMonth.Lon]}
			zoom={1}
			scrollWheelZoom={false}
			style={{ height: 400, width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker
				icon={locationIcon}
				position={[countryMonth.Lat, countryMonth.Lon]}
			>
				<Popup>{countryMonth.Country} is located here.</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
