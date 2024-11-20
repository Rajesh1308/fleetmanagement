import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <button className="menu-button" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
            </button>
            {!isCollapsed && (
                <div className="sidebar-content">
                    <h2>Location Tracking</h2>
                    <ul>
                        <li>
                            <Link to="/">Location</Link>
                        </li>
                        <li>
                            <Link to="/truckdetails">Vehicles</Link>
                        </li>
                        <li>
                            <Link to="/driverdetails">Drivers</Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
