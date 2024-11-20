import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import './styles/LiveData.css'; // Importing external CSS for LiveData
import { GoogleMap, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const server_url = "https://fleetmanagementserver.onrender.com:3000/"

const socket = io(server_url); // Replace with your backend server URL

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
    const [tcuStatus, setTcuStatus] = useState(0);
    const [directionsResponse, setDirectionsResponse] = useState(null);
    const [vehicleLocation, setVehicleLocation] = useState("");

    const vehicleTypes = ['truck', 'van', 'auto'];
    const vehicleIds = ['7825', '7826', '7569', '8589', '4545', '8521'];

    const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);
    const handleVehicleIdChange = (e) => setVehicleId(e.target.value);

    const destinationName = useState("Ajmer");
    const [destination, setDestination] = useState({ lat: 26.4499, lng: 74.6399 }) // Ajmer GPS coordinates

    useEffect(() => {
        const loadTopic = `fleet/${vehicleType}/${vehicleId}/load`;
        const latitudeTopic = `fleet/${vehicleType}/${vehicleId}/latitude`;
        const longitudeTopic = `fleet/${vehicleType}/${vehicleId}/longitude`;

        socket.on('mqtt-message', (data) => {
            // console.log('Received message:', data);

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
            const fetchDistanceAndTime = async () => {
                const origin = `${data.latitude},${data.longitude}`;
                const destinationString = `${destination.lat},${destination.lng}`;

                try {
                    const response = await fetch(
                        `${server_url}api/distance?origins=${origin}&destinations=${destinationString}`
                    );
                    const result = await response.json();
                    setVehicleLocation(result.origin_addresses[0])

                    if (result.rows[0].elements[0].status === 'OK') {
                        setDistance(result.rows[0].elements[0].distance.text);
                        setEstimatedTime(result.rows[0].elements[0].duration.text);
                        setTcuStatus(1);
                    } else {
                        console.error('Error fetching distance matrix data:', result);
                        setDistance('N/A');
                        setEstimatedTime('N/A');
                        setTcuStatus(0);
                    }
                } catch (error) {
                    console.error('Error fetching distance matrix data:', error);
                    setDistance('N/A');
                    setEstimatedTime('N/A');
                }
            };

            fetchDistanceAndTime();
        }
    }, [data.latitude, data.longitude, destination.lat, destination.lng]);

    useEffect(() => {
        if (data.latitude && data.longitude) {
            const fetchDirections = async () => {
                const directionsService = new window.google.maps.DirectionsService();

                const results = await directionsService.route({
                    origin: { lat: data.latitude, lng: data.longitude },
                    destination,
                    travelMode: window.google.maps.TravelMode.DRIVING, // Adjust travel mode as needed
                });

                setDirectionsResponse(results);
            };

            fetchDirections();
        }
    }, [data.latitude, data.longitude, destination]);

    // Google Maps setup
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: 'AIzaSyAcEARwy22d2atZr5W31x9N90DBr_ZDF8U',
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
                                <p><strong>Distance:</strong> {distance || '...'}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Destination : </strong> {destinationName} </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Estimated Time:</strong> {estimatedTime || '...'}</p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>TCU Status : </strong> {tcuStatus ? "Online" : "Offline"} </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="data-box">
                                <p><strong>Location : </strong> {vehicleLocation !== "" ? vehicleLocation.split(", ").slice(1).join(", ") : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoaded && (
                    <div className="map-container mt-4">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={data.latitude && data.longitude ? { lat: data.latitude, lng: data.longitude } : center}
                            zoom={10}
                        >
                            {data.latitude && data.longitude && (
                                <Marker position={{ lat: data.latitude, lng: data.longitude }} label={vehicleId} />
                            )}
                            {directionsResponse && (
                                <DirectionsRenderer
                                    directions={directionsResponse}
                                    options={{
                                        suppressMarkers: true, // Suppress default markers from DirectionsRenderer
                                    }}
                                />
                            )}
                        </GoogleMap>

                    </div>
                )}
            </div>
        </div>
    );
};

export default LiveData;
