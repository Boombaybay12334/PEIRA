import { useEffect, useMemo, useRef, useState } from "react";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import type { PointsData, Point } from "../lib/modules/schemas";
import { OPEN_FREEMAP_STYLE_URL } from "../lib/modules/config";
import { boundsOf, filterPointsUpTo, scenarioPoints, sortedDates } from "../lib/modules/helpers";
import ModuleErrorBoundary from "./ModuleErrorBoundary";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  data: PointsData;
  title: string;
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", { dateStyle: "medium", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );

function MapTimelineView({ data }: Props) {
  const mapElement = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const maplibreRef = useRef<typeof import("maplibre-gl") | null>(null);
  const [mapReady, setMapReady] = useState(false);
  const markersRef = useRef<Marker[]>([]);
  const [mapFailed, setMapFailed] = useState(false);
  const [dateIndex, setDateIndex] = useState(0);
  const [scenarioId, setScenarioId] = useState("historical");
  const [playing, setPlaying] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const dates = useMemo(() => sortedDates(data.points), [data.points]);
  const scenarios = data.scenarios ?? [];
  const selectedScenario = scenarios.find((scenario) => scenario.id === scenarioId);
  const visiblePoints = useMemo(() => {
    const points = scenarioPoints(data.points, scenarioId);
    return filterPointsUpTo(points, new Date(`${dates[dateIndex] ?? dates[0]}T23:59:59Z`));
  }, [data.points, dates, dateIndex, scenarioId]);

  useEffect(() => {
    let active = true;
    void import("maplibre-gl")
      .then((maplibre) => {
        if (!active || !mapElement.current) return;
        maplibreRef.current = maplibre;
        const map = new maplibre.Map({
          container: mapElement.current,
          style: OPEN_FREEMAP_STYLE_URL,
          cooperativeGestures: true,
          attributionControl: {},
        });
        map.on("error", () => {
          if (active) setMapFailed(true);
        });
        mapRef.current = map;
        setMapReady(true);
      })
      .catch(() => {
        if (active) setMapFailed(true);
      });

    return () => {
      active = false;
      markersRef.current.forEach((marker) => marker.remove());
      mapRef.current?.remove();
      mapRef.current = null;
      maplibreRef.current = null;
      setMapReady(false);
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    const maplibre = maplibreRef.current;
    if (!map || !maplibre || mapFailed || !mapReady) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    visiblePoints.forEach((point) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      const isLatest = point.time.toISOString().slice(0, 10) === latestDate;
      markerElement.className = `map-marker map-marker--${point.side.toLowerCase().replace(/[^a-z0-9]+/g, "-")}${isLatest ? " map-marker--latest" : ""}`;
      markerElement.setAttribute("aria-label", `${point.label}, ${point.place}`);
      markerElement.addEventListener("click", () => setSelectedPoint(point));
      markerElement.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setSelectedPoint(point);
        }
      });
      const marker = new maplibre.Marker({ element: markerElement })
        .setLngLat([point.lon, point.lat])
        .addTo(map);
      markersRef.current.push(marker);
    });

    const bounds = boundsOf(visiblePoints);
    if (bounds) {
      map.fitBounds(
        [
          [bounds.west, bounds.south],
          [bounds.east, bounds.north],
        ],
        {
          padding: 48,
          duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 500,
        },
      );
    }
  }, [visiblePoints, mapFailed, mapReady]);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPlaying(false);
      return;
    }
    const timer = window.setInterval(() => {
      setDateIndex((current) => {
        if (current >= dates.length - 1) {
          setPlaying(false);
          return current;
        }
        return current + 1;
      });
    }, 1200);
    return () => window.clearInterval(timer);
  }, [playing, dates.length]);

  const latestDate = dates[dates.length - 1];

  return (
    <div className="map-timeline" aria-label="Interactive map timeline">
      {scenarios.length > 1 && (
        <fieldset className="map-timeline__scenarios">
          <legend>Scenario</legend>
          {scenarios.map((scenario) => (
            <label key={scenario.id}>
              <input
                type="radio"
                name="scenario"
                value={scenario.id}
                checked={scenario.id === scenarioId}
                onChange={() => {
                  setScenarioId(scenario.id);
                  const firstScenarioPoint = data.points.find(
                    (point) => (point.scenario ?? "historical") === scenario.id,
                  );
                  setDateIndex(
                    firstScenarioPoint
                      ? dates.indexOf(firstScenarioPoint.time.toISOString().slice(0, 10))
                      : 0,
                  );
                  setSelectedPoint(null);
                }}
              />
              {scenario.label}
            </label>
          ))}
        </fieldset>
      )}
      {selectedScenario && (
        <div className="map-timeline__scenario-copy" aria-live="polite">
          {selectedScenario.exploration && <strong>Exploration, not a prediction</strong>}
          <p>{selectedScenario.summary ?? selectedScenario.assumptions.join(" ")}</p>
          <details>
            <summary>Assumptions and limitations</summary>
            <ul>
              {selectedScenario.assumptions.map((assumption) => (
                <li key={assumption}>{assumption}</li>
              ))}
              {selectedScenario.limitations.map((limitation) => (
                <li key={limitation}>{limitation}</li>
              ))}
            </ul>
          </details>
        </div>
      )}
      <div
        className={`map-timeline__canvas${mapFailed ? " map-timeline__canvas--fallback" : ""}`}
        ref={mapElement}
        role="region"
        aria-label="Interactive map"
      >
        {mapFailed && (
          <>
            <p className="map-timeline__map-message">
              The map tiles could not load. The points remain available in the table below.
            </p>
            <div className="map-timeline__fallback-points">
              {visiblePoints.map((point) => (
                <button type="button" key={point.id} onClick={() => setSelectedPoint(point)}>
                  {point.label} — {point.place}
                </button>
              ))}
            </div>
          </>
        )}
        {!mapFailed && <p className="sr-only">Map markers are keyboard focusable.</p>}
      </div>
      <div className="map-timeline__controls">
        <label htmlFor="map-date">
          Date <output>{formatDate(dates[dateIndex] ?? latestDate)}</output>
        </label>
        <input
          id="map-date"
          type="range"
          min="0"
          max={Math.max(0, dates.length - 1)}
          value={dateIndex}
          onChange={(event) => setDateIndex(Number(event.target.value))}
          aria-valuetext={formatDate(dates[dateIndex] ?? latestDate)}
        />
        <div className="map-timeline__buttons">
          <button type="button" onClick={() => setDateIndex((current) => Math.max(0, current - 1))}>
            Previous
          </button>
          <button type="button" onClick={() => setPlaying((current) => !current)}>
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => setDateIndex((current) => Math.min(dates.length - 1, current + 1))}
          >
            Next
          </button>
        </div>
      </div>
      {selectedPoint && (
        <aside className="map-timeline__popup" aria-label={`${selectedPoint.label} details`}>
          <button
            type="button"
            onClick={() => setSelectedPoint(null)}
            aria-label="Close point details"
          >
            Close
          </button>
          <h3>{selectedPoint.label}</h3>
          <p>
            {selectedPoint.place} · {selectedPoint.time.toISOString().slice(0, 10)}
          </p>
          <dl>
            <div>
              <dt>Sources</dt>
              <dd>{selectedPoint.source.join(", ")}</dd>
            </div>
            <div>
              <dt>Strength</dt>
              <dd>
                {selectedPoint.strength.low}–{selectedPoint.strength.high}{" "}
                {selectedPoint.strength.unit}
              </dd>
            </div>
            <div>
              <dt>Confidence</dt>
              <dd>{selectedPoint.confidence}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{selectedPoint.status}</dd>
            </div>
          </dl>
        </aside>
      )}
    </div>
  );
}

export default function MapTimelineIsland(props: Props) {
  return (
    <ModuleErrorBoundary>
      <MapTimelineView {...props} />
    </ModuleErrorBoundary>
  );
}
