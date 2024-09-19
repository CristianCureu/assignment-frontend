export type SVGProps = {
  type: string;
  color: string;
  width: number;
  height: number;
  top: number | string;
  left: number | string;
  rotate?: number;
};

const CustomSVG = ({ type, color, width, height, top, left, rotate = 0 }: SVGProps) => {
  const style: React.CSSProperties = {
    position: "absolute",
    top: top,
    left: left,
    transform: `rotate(${rotate}deg)`,
    transformOrigin: "center",
  };

  switch (type) {
    case "eclipse":
      return (
        <div style={style}>
          <svg
            width={width}
            height={height}
            viewBox="0 0 214 214"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="107" cy="107" r="107" fill={color} />
          </svg>
        </div>
      );
    case "halfEclipse":
      return (
        <div style={style}>
          <svg
            width={width}
            height={height}
            viewBox="0 0 214 214"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M139.695 139.695C178.27 101.119 178.27 38.5758 139.695 0.000281828L0.000415538 139.695C38.576 178.27 101.119 178.27 139.695 139.695Z"
              fill={color}
            />
          </svg>
        </div>
      );
    case "poligon":
      return (
        <div style={style}>
          <svg
            width={width}
            height={height}
            viewBox="0 0 400 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M222.917 1.39483C237.788 -2.58995 251.396 11.0183 247.412 25.8897L191.824 233.346C187.839 248.217 169.25 253.198 158.363 242.312L6.49486 90.4431C-4.39176 79.5565 0.58922 60.9673 15.4606 56.9825L222.917 1.39483Z"
              fill={color}
            />
          </svg>
        </div>
      );
    case "rectangle":
      return (
        <div style={style}>
          <svg
            width={width}
            height={height}
            viewBox="0 0 400 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="-13"
              y="82.0459"
              width="367.229"
              height="123.74"
              rx="61.8701"
              transform="rotate(-15 -13 82.0459)"
              fill={color}
            />
          </svg>
        </div>
      );
    default:
      return null;
  }
};

export default CustomSVG;
