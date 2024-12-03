import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <h3 className="navbar-title">Dashboard</h3>
            </div>
        </nav>
    );
};

export default Navbar;
