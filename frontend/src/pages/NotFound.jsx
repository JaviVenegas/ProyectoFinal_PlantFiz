import { useNavigate } from "react-router-dom";

const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="display">
      <div className="display__img">
        <img
          src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2018/06/how-to-fix-error-404-1.webp"
          alt="React Image"
        />
      </div>
      <div className="text-center m-5">
        <button onClick={() => navigate("/")} className="btn btn-primary px-2">
          Home
        </button>
      </div>
    </div>
  );
};

export default Notfound;
