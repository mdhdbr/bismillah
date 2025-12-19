
"use client";

import { Source, Layer } from 'react-map-gl';
import type { LineLayer } from 'react-map-gl';
import type { Feature, LineString } from 'geojson';

const routeLayerStyle: LineLayer = {
    id: 'route',
    type: 'line',
    source: 'route',
    layout: {
        'line-join': 'round',
        'line-cap': 'round',
    },
    paint: {
        'line-color': '#3b82f6', // A nice blue color
        'line-width': 5,
        'line-opacity': 0.8,
    }
};

interface RouteLayerProps {
  coordinates: number[][];
}

export default function RouteLayer({ coordinates }: RouteLayerProps) {
  if (!coordinates || coordinates.length < 2) {
    return null;
  }
  
  const geojson: Feature<LineString> = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'LineString',
      coordinates: coordinates,
    },
  };

  return (
    <Source id="route-source" type="geojson" data={geojson}>
      <Layer {...routeLayerStyle} />
    </Source>
  );
}
