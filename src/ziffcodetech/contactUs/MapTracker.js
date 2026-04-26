import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import './MapTracker.css';

// Fix typical Leaflet icon issues in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

// Ziffcode Office Precise Coordinates (Kasam Plaza, Ikotun-Idimu Rd)
const ZIFFCODE_LOCATION = L.latLng(6.5510, 3.2690);

const TILE_LAYERS = {
    street: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }),
    satellite: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    }),
    dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }),
};

const MapTracker = () => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const routingControlRef = useRef(null);
    const [mapStyle, setMapStyle] = useState('street');
    const [distanceInfo, setDistanceInfo] = useState(null);
    const [userLocationDisabled, setUserLocationDisabled] = useState(false);

    useEffect(() => {
        if (!mapRef.current) {
            // Initialize map
            mapRef.current = L.map(mapContainerRef.current, {
                center: ZIFFCODE_LOCATION,
                zoom: 15,
                zoomControl: false,
            });

            // Add zoom control to top right
            L.control.zoom({ position: 'topright' }).addTo(mapRef.current);

            // Set default layer
            TILE_LAYERS[mapStyle].addTo(mapRef.current);

            // Add marker for Ziffcode Office
            L.marker(ZIFFCODE_LOCATION)
                .addTo(mapRef.current)
                .bindPopup('<div class="office-popup"><b>Ziffcode Office</b><br>Suit 49, Kasam Plaza</div>')
                .openPopup();

            // Setup GeoSearch (Autocomplete Address Bar)
            const provider = new OpenStreetMapProvider();
            const searchControl = new GeoSearchControl({
                provider: provider,
                style: 'bar',
                showMarker: false,
                showPopup: false,
                autoClose: true,
                retainZoomLevel: false,
                animateZoom: true,
                keepResult: true,
                searchLabel: 'Enter your address or city...'
            });
            mapRef.current.addControl(searchControl);

            // Listen for search result
            mapRef.current.on('geosearch/showlocation', (result) => {
                const searchedLocation = L.latLng(result.location.y, result.location.x);
                setupRouting(searchedLocation, ZIFFCODE_LOCATION);
                setUserLocationDisabled(false); 
            });

            // Try to get user location for routing
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const userLocation = L.latLng(position.coords.latitude, position.coords.longitude);
                        setupRouting(userLocation, ZIFFCODE_LOCATION);
                    },
                    (error) => {
                        console.error('Error getting location', error);
                        setUserLocationDisabled(true);
                        // Fallback: just show the map around the office
                        mapRef.current.setView(ZIFFCODE_LOCATION, 15);
                    },
                    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
                );
            } else {
                setUserLocationDisabled(true);
            }
        }

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [mapStyle]);

    const setupRouting = (startPoint, endPoint) => {
        if (routingControlRef.current) {
            routingControlRef.current.remove();
        }

        const plan = new L.Routing.Plan([startPoint, endPoint], {
            createMarker: function(i, wp, nWps) {
                // Return null to not create default markers since we add custom ones or don't need them
                if (i === 0) {
                    return L.marker(wp.latLng, {
                        draggable: false,
                        icon: L.divIcon({
                            className: 'user-location-marker',
                            html: '<div class="pulse"></div>',
                            iconSize: [20, 20]
                        })
                    }).bindPopup("You are here");
                }
                if (i === nWps - 1) {
                    return L.marker(wp.latLng).bindPopup("<b>Ziffcode Office</b>");
                }
            },
            routeWhileDragging: false,
            addWaypoints: false,
        });

        routingControlRef.current = L.Routing.control({
            plan: plan,
            router: L.Routing.osrmv1({
                language: 'en',
                profile: 'driving'
            }),
            lineOptions: {
                styles: [{ color: '#0d6efd', opacity: 0.8, weight: 6 }]
            },
            show: false, // hide the default instruction panel to style our own summary
            fitSelectedRoutes: true,
        }).addTo(mapRef.current);

        routingControlRef.current.on('routesfound', function(e) {
            const routes = e.routes;
            if (routes && routes.length > 0) {
                const summary = routes[0].summary;
                const distanceKm = (summary.totalDistance / 1000).toFixed(1);
                const timeMinutes = Math.round(summary.totalTime / 60);
                
                setDistanceInfo({
                    distance: distanceKm,
                    time: timeMinutes >= 60 ? `${Math.floor(timeMinutes / 60)} hr ${timeMinutes % 60} min` : `${timeMinutes} min`
                });
            }
        });
    };

    const handleStyleChange = (style) => {
        setMapStyle(style);
        // Remove all tile layers
        mapRef.current.eachLayer((layer) => {
            if (layer instanceof L.TileLayer) {
                mapRef.current.removeLayer(layer);
            }
        });
        // Add selected layer
        TILE_LAYERS[style].addTo(mapRef.current);
    };

    return (
        <div className="map-tracker-wrapper position-relative w-100 h-100 rounded overflow-hidden shadow-sm">
            <div ref={mapContainerRef} className="w-100 h-100 map-container"></div>
            
            {/* Map Controls Interface */}
            <div className="map-overlay-controls d-flex flex-column justify-content-between p-3 position-absolute top-0 start-0 w-100 h-100 pointer-events-none">
                
                {/* Top Bar - Formats */}
                <div className="d-flex justify-content-end pointer-events-auto">
                    <div className="map-style-selector bg-white bg-opacity-75 backdrop-blur rounded-pill p-1 shadow-sm d-flex border border-white">
                        <button 
                            type="button"
                            className={`btn btn-sm rounded-pill border-0 px-3 ${mapStyle === 'street' ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-secondary'}`}
                            onClick={() => handleStyleChange('street')}
                        >
                            <i className="bi bi-map-fill me-1"></i> Street
                        </button>
                        <button 
                            type="button"
                            className={`btn btn-sm rounded-pill border-0 px-3 ${mapStyle === 'satellite' ? 'btn-primary shadow-sm' : 'btn-light bg-transparent text-secondary'}`}
                            onClick={() => handleStyleChange('satellite')}
                        >
                            <i className="bi bi-globe-americas me-1"></i> Satellite
                        </button>
                        <button 
                            type="button"
                            className={`btn btn-sm rounded-pill border-0 px-3 ${mapStyle === 'dark' ? 'btn-dark shadow-sm' : 'btn-light bg-transparent text-secondary'}`}
                            onClick={() => handleStyleChange('dark')}
                        >
                            <i className="bi bi-moon-stars-fill me-1"></i> Dark
                        </button>
                    </div>
                </div>

                {/* Bottom Bar - Route Info */}
                <div className="d-flex justify-content-center pointer-events-auto mt-auto mb-2">
                    {distanceInfo ? (
                        <div className="route-info-card bg-white rounded-4 shadow-lg p-3 d-flex align-items-center border-bottom border-primary border-4 animate__animated animate__fadeInUp">
                            <div className="bg-primary bg-opacity-10 text-primary rounded-circle p-3 me-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-car-front-fill fs-4"></i>
                            </div>
                            <div>
                                <h5 className="fw-bold mb-0 text-dark">{distanceInfo.time}</h5>
                                <p className="text-muted mb-0 small fw-medium">{distanceInfo.distance} km away from you</p>
                            </div>
                        </div>
                    ) : userLocationDisabled ? (
                        <div className="route-info-card bg-white rounded-4 shadow p-3 d-flex align-items-center border-bottom border-warning border-4">
                            <div className="bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3 d-flex align-items-center justify-content-center">
                                <i className="bi bi-geo-alt-slash-fill fs-4"></i>
                            </div>
                            <div>
                                <h6 className="fw-bold mb-0 text-dark">Search Your Location</h6>
                                <p className="text-muted mb-0 small" style={{fontSize: '0.8rem'}}>Use the search bar to calculate distance.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-pill shadow px-4 py-2 d-flex align-items-center">
                            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <span className="text-muted fw-medium small">Locating you...</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapTracker;
