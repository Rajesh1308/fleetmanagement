import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import './styles/LiveData.css'; // Importing external CSS for LiveData
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const socket = io('http://localhost:3000'); // Replace with your backend server URL

const LiveData = () => {
    const [data, setData] = useState({
        load: 0,
        latitude: null,
        longitude: null,
    });
    const [vehicleType, setVehicleType] = useState('truck');
    const [vehicleId, setVehicleId] = useState('7825');
    const [distance, setDistance] = useState(null);
    const [estimatedTime, setEstimatedTime] = useState(null);

    const vehicleTypes = ['truck', 'van', 'auto'];
    const vehicleIds = ['7825', '7826', '7569', '8589', '4545', '8521'];

    const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);
    const handleVehicleIdChange = (e) => setVehicleId(e.target.value);

    const destination = { lat: 26.4499, lng: 74.6399 }; // Ajmer GPS coordinates

    useEffect(() => {
        const loadTopic = `fleet/${vehicleType}/${vehicleId}/load`;
        const latitudeTopic = `fleet/${vehicleType}/${vehicleId}/latitude`;
        const longitudeTopic = `fleet/${vehicleType}/${vehicleId}/longitude`;

        socket.on('mqtt-message', (data) => {
            console.log('Received message:', data);

            if (data.topic === loadTopic) {
                setData((prevData) => ({
                    ...prevData,
                    load: data.message,
                }));
            } else if (data.topic === latitudeTopic) {
                setData((prevData) => ({
                    ...prevData,
                    latitude: parseFloat(data.message),
                }));
            } else if (data.topic === longitudeTopic) {
                setData((prevData) => ({
                    ...prevData,
                    longitude: parseFloat(data.message),
                }));
            }
        });

        return () => {
            socket.off('mqtt-message');
        };
    }, [vehicleType, vehicleId]);

    useEffect(() => {
        if (data.latitude && data.longitude) {
            const origin = { lat: data.latitude, lng: data.longitude };

            // Use the Haversine formula to calculate the distance
            const calculateDistance = (origin, destination) => {
                const R = 6371; // Radius of the Earth in kilometers
                const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
                const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos((origin.lat * Math.PI) / 180) *
                        Math.cos((destination.lat * Math.PI) / 180) *
                        Math.sin(dLng / 2) *
                        Math.sin(dLng / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return R * c; // Distance in kilometers
            };

            const distanceToAjmer = calculateDistance(origin, destination);
            setDistance(distanceToAjmer.toFixed(2)); // Keep two decimal places

            // Assume an average speed of 60 km/h for estimated time
            const estimatedTimeInHours = distanceToAjmer / 60;
            const estimatedTimeInMinutes = estimatedTimeInHours * 60;
            setEstimatedTime(`${Math.ceil(estimatedTimeInMinutes)} mins`);
        }
    }, [data.latitude, data.longitude]);

    // Google Maps setup
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY',
    });

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat: data.latitude || destination.lat,
        lng: data.longitude || destination.lng,
    };

    return (
        <div className="app-container">
            <Sidebar />
            <div className="main-content">
                <Navbar />
                <div className="filters">
                    <select value={vehicleType} onChange={handleVehicleTypeChange}>
                        {vehicleTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>

                    <select value={vehicleId} onChange={handleVehicleIdChange}>
                        {vehicleIds.map((id) => (
                            <option key={id} value={id}>
                                {id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="container mt-4">
                    <div className="row g-3">
                        {/* Existing Bootstrap grid */}
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Vehicle ID : </strong> {vehicleId}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Vehicle Type : </strong> {vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Driver Name : </strong> Mr. Nikumbh</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Load Details : </strong> {data.load}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Distance:</strong> {distance ? `${distance} km` : 'Calculating...'}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Destination : </strong> </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Estimated Time:</strong> {estimatedTime || 'Calculating...'}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>TCU Status:</strong> Online</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Latitude:</strong> {data.latitude !== null ? data.latitude : 'N/A'}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Longitude:</strong> {data.longitude !== null ? data.longitude : 'N/A'}</p>
                            </div>
                        </div>
                        {/* Other grid items */}
                    </div>
                </div>
                {isLoaded && (
                    <div className="map-container mt-4">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={center}
                            zoom={10}
                        >
                            {data.latitude && data.longitude && (
                                <Marker position={center} label="Truck Location" />
                            )}
                        </GoogleMap>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveData;
