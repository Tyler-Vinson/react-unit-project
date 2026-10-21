import { useState } from "react";
import { Link } from "react-router-dom";
import roomImage from "../assets/room-without-pillars.png";
import closedLeftDoor from "../assets/three-doors-left-closed.png";
import openLeftDoor from "../assets/three-doors-left-open.png";
import openCenterDoor from '../assets/three-doors-center-open-static-frame.png'
import closedCenterDoor from "../assets/doorclosed.png";
import closedRightDoor from "../assets/three-doors-right-closed.png";
import openRightDoor from "../assets/three-doors-right-open.png";

const ThreeDoors = () => {
  const [activeDoor, setActiveDoor] = useState(null);

  const hoverProps = (door) => ({
    onMouseEnter: () => setActiveDoor(door),
    onMouseLeave: () => setActiveDoor(null),
    onFocus: () => setActiveDoor(door),
    onBlur: () => setActiveDoor(null),
  });

  return (
    <main className="three-doors-room">
      <div className="room-scene">
        <img
          className="room-image"
          src={roomImage}
          alt="Museum hallway with three closed doors"
        />
        <div className="room-door room-door-left">
          <Link
            className="room-door-link"
            to="/pre-mall"
            aria-label="Explore Valley View Center"
            {...hoverProps("left")}
          >
            <img
              className={`room-door-state${activeDoor === "left" ? " room-door-state-open" : ""}`}
              src={activeDoor === "left" ? openLeftDoor : closedLeftDoor}
              alt=""
            />
          </Link>
        </div>
        <div className="room-door room-door-center">
          <Link
            className="room-door-link"
            to="/pre-slender"
            aria-label="Explore Slender Man"
            {...hoverProps("center")}
          >
            <span
              className={`room-door-doorway${activeDoor === "center" ? " room-door-doorway-open" : ""}`}
              aria-hidden="true"
            />
            <img
              className={`room-door-state${activeDoor === "center" ? " room-door-state-open" : ""}`}
              src={activeDoor === "center" ? openCenterDoor : closedCenterDoor}
              alt=""
            />
          </Link>
        </div>
        <div className="room-door room-door-right">
          <Link
            className="room-door-link"
            to="/pre-witch"
            aria-label="Explore The Blair Witch Project"
            {...hoverProps("right")}
          >
            <img
              className={`room-door-state${activeDoor === "right" ? " room-door-state-open" : ""}`}
              src={activeDoor === "right" ? openRightDoor : closedRightDoor}
              alt=""
            />
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ThreeDoors;
