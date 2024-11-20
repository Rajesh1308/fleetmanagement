import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./styles/DriverDetails.css"; // Custom styles for Driver Details
import Navbar from './Layouts/Navbar';
import Sidebar from './Layouts/Sidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const DriverDetails = () => {
  return (
    <div className="app-container">
      {/* Menu */}
      <Sidebar />
      <div className="main-content">
        {/* Navbar */}
        <Navbar />

        {/* Main Content Area */}
        <div className="content">
          <h3>Driver Details</h3>

          {/* Driver Details Table */}
          <div className="table-container">
            <table className="table table-bordered table-hover">
              <thead>
                <tr className="header-row">
                  <th>Driver Name</th>
                  <th>Mobile Number</th>
                  <th>License Number</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="data-row">
                  <td>Mr. Ballaiya</td>
                  <td>9791961555</td>
                  <td>INRC6548999A65</td>
                  <td>
                    <span className="badge bg-success">Active</span>
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="view-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#driverModal1"
                    />
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Example */}
        <div
          className="modal fade"
          id="driverModal1"
          tabIndex="-1"
          aria-labelledby="driverModal1Label"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="driverModal1Label">
                  Driver Details - Nikumbh
                </h5>
              </div>
              <div className="modal-body">
                <p>
                  <strong>Driver Name:</strong> Nikumbh
                </p>
                <p>
                  <strong>Mobile Number:</strong> 9791961555
                </p>
                <p>
                  <strong>License Number:</strong> INRC6548999A65
                </p>
                <p>
                  <strong>Status:</strong> <span className="badge bg-success">Active</span>
                </p>
                <p>
                  <strong>Address:</strong> 1234, Driver Colony, City Name, State
                </p>
                <p>
                  <strong>Date of Joining:</strong> 10th January 2020
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

export default DriverDetails;
