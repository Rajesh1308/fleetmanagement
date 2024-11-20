
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/TruckDetails.css"
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div className="app-container">
      {/* Menu */}
      <Sidebar />
      <div className="main-content">
        {/* Navbar */}
        <Navbar />
        
        

        

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
                  <strong>Truck ID:</strong> 7826
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
                  <strong>Manufactured By:</strong> Bharath Benz
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
    </div>
  );
};

export default Dashboard;
