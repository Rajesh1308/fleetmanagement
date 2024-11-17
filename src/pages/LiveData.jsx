import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './styles/LiveData.css'; // Importing external CSS for better styling

const socket = io('http://localhost:3000'); // Replace with your backend server URL

const LiveData = () => {
    const [data, setData] = useState({
        load: 0,
        latitude: null,
        longitude: null,
    }); // Store all three values in a single object
    const [vehicleType, setVehicleType] = useState('truck'); // Default vehicle type is truck
    const [vehicleId, setVehicleId] = useState('7825'); // Default vehicle ID

    const vehicleTypes = ['truck', 'van', 'auto'];
    const vehicleIds = ['7825', '7826', '7569', '8589', '4545', '8521'];

    const handleVehicleTypeChange = (e) => {
        setVehicleType(e.target.value);
    };

    const handleVehicleIdChange = (e) => {
        setVehicleId(e.target.value);
    };

    useEffect(() => {
        // Construct the topic for each MQTT subscription dynamically
        const loadTopic = `fleet/${vehicleType}/${vehicleId}/load`;
        const latitudeTopic = `fleet/${vehicleType}/${vehicleId}/latitude`;
        const longitudeTopic = `fleet/${vehicleType}/${vehicleId}/longitude`;

        // Listen for MQTT messages and update state based on the topic
        socket.on('mqtt-message', (data) => {
            console.log('Received message:', data);

            // Update the corresponding value based on the topic
            if (data.topic === loadTopic) {
                setData((prevData) => ({
                    ...prevData,
                    load: data.message, // Update load value
                }));
            } else if (data.topic === latitudeTopic) {
                setData((prevData) => ({
                    ...prevData,
                    latitude: data.message, // Update latitude value
                }));
            } else if (data.topic === longitudeTopic) {
                setData((prevData) => ({
                    ...prevData,
                    longitude: data.message, // Update longitude value
                }));
            }
        });

        // Cleanup the listener when the component unmounts
        return () => {
            socket.off('mqtt-message');
        };
    }, [vehicleType, vehicleId]); // Re-run the effect when either vehicleType or vehicleId changes

    return (
        <div className="app-container">
            <div className="sidebar">
                <h2>Location Tracking</h2>
                <ul>
                    <li>Vehicles</li>
                    <li>Drivers</li>
                    <li>Location</li>
                </ul>
            </div>
            <div className="main-content">
                <div className="navbar">
                    <h3>Location Tracking</h3>
                </div>
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
                <div className="data-container">
                    <div className="data-box">
                        <p><strong>Load:</strong> {data.load}</p>    
                    </div>
                    <div className="data-box">
                        <p><strong>Latitude:</strong> {data.latitude !== null ? data.latitude : 'N/A'}</p>
                    </div>
                    <div className="data-box">
                        <p><strong>Longitude:</strong> {data.longitude !== null ? data.longitude : 'N/A'}</p>
                    </div>
                    <div className="data-box">
                        <p><strong>TCU Status:</strong> Online</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveData;
