import "@tomtom-international/web-sdk-maps/dist/maps.css";
import tt from "@tomtom-international/web-sdk-maps";
import ttService from "@tomtom-international/web-sdk-services";
import { useEffect, useRef, useState } from "react";
import { type TicketEvent } from "@/types/TicketEvent";

type MapProps = {
  event: TicketEvent;
};

const TT_KEY = process.env.NEXT_PUBLIC_TT_KEY;
export function Map({ event }: MapProps) {
  const [map, setMap] = useState<any>({});
  const [coords, setCoords] = useState(null);
  const mapElement = useRef<any>();

  useEffect(() => {
    let map = tt.map({
      key: TT_KEY as string,
      container: mapElement.current,
      center: [4.900437, 52.379184],
      zoom: 12,
      style: {
        map: "basic_night",
        trafficIncidents: "2/incidents_dark",
        trafficFlow: "2/flow_relative-dark",
        poi: "2/poi_dark",
      },
    });
    setMap(map);

    map.on("load", function () {
      const nav = new tt.NavigationControl({});
      map.addControl(nav, "bottom-right");
      map.showPOI();
    });
    searchCoords();
    return () => map.remove();
  }, []);

  useEffect(() => {
    if (coords) {
      map.flyTo({ center: { lat: coords[1], lon: coords[0] } });
      const popupTitle = `${event.name} at ${event.location?.name}`;
      const popup = new tt.Popup({ offset: 30, className: "popup" }).setText(
        popupTitle
      );
      new tt.Marker({
        anchor: "bottom",
      })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);
    }
  }, [coords]);

  const searchCoords = async () => {
    const geocodeOptions = {
      key: TT_KEY as string,
      query: `${event.location?.name} ${event.location?.city} ${event.location?.country}`,
    };

    const geocodeResult = await (
      await ttService.services.geocode(geocodeOptions)
    ).toGeoJson();
    if (geocodeResult) {
      if (geocodeResult.features && geocodeResult.features.length > 0) {
        setCoords(geocodeResult.features[0].geometry.coordinates);
      }
    }
  };

  return (
    <>
      <div ref={mapElement} className="w-full h-full rounded-md" />
    </>
  );
}
