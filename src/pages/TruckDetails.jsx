
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/TruckDetails.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTruck,
  faIdCard,
  faMapMarkerAlt,
  faRoute,
  faPeopleCarry,
  faCalendarAlt,
  faCalendarCheck,
  faChartLine,
  faSearch,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div>
      {/* Menu */}
      <div className="menu">
        <ul>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faHome} /> Home
            </a>
          </li>
          <li>
            <a href="truckdetails.html" className="active">
              <FontAwesomeIcon icon={faTruck} /> Truck Details
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faIdCard} /> Driver Info
            </a>
          </li>
          <li>
            <a href="index.html">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Live Tracking
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faRoute} /> Geofences
            </a>
          </li>
          <li>
            <a
              href="#collapseBookings"
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              <FontAwesomeIcon icon={faPeopleCarry} /> 3PL Partners
            </a>
            <ul id="collapseBookings" className="collapse list-unstyled">
              <li>
                <a href="#">
                  <FontAwesomeIcon icon={faCalendarAlt} /> Bookings
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faCalendarCheck} /> Schedules
            </a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faChartLine} /> Reports
            </a>
          </li>
        </ul>
      </div>

      {/* Navbar */}
      <div className="navbar">
        <h1 className="title">DASHBOARD</h1>
        <div className="search-container">
          <input type="text" placeholder="Search..." />
          <FontAwesomeIcon icon={faSearch} />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="content">
        <h3>Truck Details</h3>

        {/* Truck Details Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr className="header-row">
                <th>Truck ID</th>
                <th>Vehicle Number</th>
                <th>Model</th>
                <th>Total Capacity (Tons)</th>
                <th>Route</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="data-row">
                <td>2013081234</td>
                <td>GJ-01-AB-1234</td>
                <td>Freightliner Cascadia</td>
                <td>12</td>
                <td>Ahmedabad to Jaipur</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEye}
                    className="view-icon"
                    data-bs-toggle="modal"
                    data-bs-target="#truckModal1"
                  />
                </td>
              </tr>
              {/* Repeat for other rows */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Example */}
      <div
        className="modal fade"
        id="truckModal1"
        tabIndex="-1"
        aria-labelledby="truckModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="truckModal1Label">
                Truck Details - GJ-01-AB-1234
              </h5>
            </div>
            <div className="modal-body">
              <p>
                <strong>Truck ID:</strong> 2013081234
              </p>
              <p>
                <strong>Vehicle Number:</strong> GJ-01-AB-1234
              </p>
              <p>
                <strong>Model:</strong> Freightliner Cascadia
              </p>
              <p>
                <strong>Chassis Number:</strong> 1FUJGLDR9CSBU1234
              </p>
              <p>
                <strong>Engine Number:</strong> 60R123456789
              </p>
              <p>
                <strong>Manufactured By:</strong> Daimler Trucks
              </p>
              <p>
                <strong>Manufactured Year:</strong> 2013
              </p>
              <p>
                <strong>Total Capacity:</strong> 12 Tons
              </p>
              <p>
                <strong>Status:</strong> Active
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Edit
              </button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
