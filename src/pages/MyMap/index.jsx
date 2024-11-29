import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyMap = () => {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]); // Armazena os marcadores
  const [polygonCoords, setPolygonCoords] = useState([]); // Armazena as coordenadas para o polígono

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]);
        },
        () => {
          setPosition([-23.55052, -46.633308]); // Fallback: São Paulo
        }
      );
    } else {
      setPosition([-23.55052, -46.633308]);
    }
  }, []);

  // Componente para capturar cliques no mapa
  const AddMarkerOnClick = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng; // Obtém coordenadas do clique
        setMarkers((prev) => {
          const newMarkers = [...prev, { lat, lng }];
          setPolygonCoords(
            newMarkers.map((marker) => [marker.lat, marker.lng])
          ); // Atualiza as coordenadas do polígono
          return newMarkers;
        });
      },
    });
    return null;
  };

  // Função para converter coordenadas geográficas em coordenadas x, y
  const convertToXY = (latlngs, map) => {
    return latlngs.map((latlng) => {
      console.log("LatLong", latlngs);
      const point = map.latLngToLayerPoint(latlng); // Converte para x, y
      return { x: point.x, y: point.y };
    });
  };

  // Função para acessar o mapa e fazer a conversão após a renderização do polígono
  const GetMapInstance = () => {
    const map = useMap(); // Acessa a instância do mapa

    useEffect(() => {
      if (polygonCoords.length >= 3) {
        const xyCoords = convertToXY(polygonCoords, map);
        console.log("Coordenadas X, Y:", xyCoords); // Exibe as coordenadas x, y no console
      }
    }, [polygonCoords, map]);

    return null;
  };

  return (
    <div className="w-screen h-screen">
      {position ? (
        <MapContainer center={position} zoom={13} className="w-full h-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Adiciona evento de clique para criar marcadores */}
          <AddMarkerOnClick />

          {/* Acessa a instância do mapa para realizar as conversões */}
          <GetMapInstance />

          {/* Renderiza os marcadores no mapa */}
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>
                Coordenadas: <br />
                Latitude: {marker.lat.toFixed(6)} <br />
                Longitude: {marker.lng.toFixed(6)}
              </Popup>
            </Marker>
          ))}

          {/* Renderiza o polígono baseado nos marcadores */}
          {polygonCoords.length >= 3 && (
            <Polygon
              positions={polygonCoords}
              color="blue"
              fillColor="blue"
              fillOpacity={0.2}
            />
          )}
        </MapContainer>
      ) : (
        <p className="text-center">Obtendo sua localização...</p>
      )}
    </div>
  );
};

export default MyMap;
