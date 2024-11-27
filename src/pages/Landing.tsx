import { useNavigate } from "react-router-dom";
import homeBackground from "../assets/home-background.svg";
import front from "../assets/front.png";
import back from "../assets/back.png";
export default function Landing() {
    const navigate = useNavigate();
  return (
    <div className="relative mt-24 px-36 py-24 text-center overflow-hidden h-screen">
      <h1 className="text-6xl font-bold z-50 relative">
        A platform where teachers and students get to{" "}
        <span className="text-primary">share their knowledge</span> and
        <span className="text-primary"> resources.</span>
      </h1>
      <p className="text-3xl mt-10 w-1/2 mx-auto z-50 relative">
        Edugate provides all necessary material to generate and access resources
        from accross different regions
      </p>
      <button className="bg-primary text-white text-lg px-16 py-3 rounded-md mt-10 relative z-50" onClick={() => navigate("/register")}>
        Get Started
      </button>
      <img src={homeBackground} alt="home-background" className="absolute top-1/4 left-0 overflow-hidden object-cover rotate-12 object-center z-10" />
      <div className="relative mt-10 w-3/5 mx-auto z-50">
        <img src={front} alt="front" className="absolute w-full top-10 border border-primary z-10" />
        <img src={back} alt="back" className="absolute w-full top-32 border border-primary left-36 z-0" />
      </div>
    </div>
  );
}
