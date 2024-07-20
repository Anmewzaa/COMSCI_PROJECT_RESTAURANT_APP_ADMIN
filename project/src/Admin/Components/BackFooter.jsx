// React Router Dom
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BackFooter = ({ props }) => {
  return (
    <>
      <ul className="footer-box">
        <li className="back-item">
          <Link to={props}>ย้อนกลับ</Link>
        </li>
      </ul>
    </>
  );
};

export default BackFooter;
