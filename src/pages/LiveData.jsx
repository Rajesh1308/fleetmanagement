import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import './styles/LiveData.css'; // Importing external CSS for LiveData

const socket = io('http://localhost:3000'); // Replace with your backend server URL

const LiveData = () => {
    const [data, setData] = useState({
        load: 0,
        latitude: null,
        longitude: null,
    });
    const [vehicleType, setVehicleType] = useState('truck');
    const [vehicleId, setVehicleId] = useState('7825');

    const vehicleTypes = ['truck', 'van', 'auto'];
    const vehicleIds = ['7825', '7826', '7569', '8589', '4545', '8521'];

    const handleVehicleTypeChange = (e) => setVehicleType(e.target.value);
    const handleVehicleIdChange = (e) => setVehicleId(e.target.value);

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
                    latitude: data.message,
                }));
            } else if (data.topic === longitudeTopic) {
                setData((prevData) => ({
                    ...prevData,
                    longitude: data.message,
                }));
            }
        });

        return () => {
            socket.off('mqtt-message');
        };
    }, [vehicleType, vehicleId]);

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
                                <p><strong>Distance : </strong> </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Destination : </strong> </p>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="data-box">
                                <p><strong>Estimated Time : </strong> </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveData;
