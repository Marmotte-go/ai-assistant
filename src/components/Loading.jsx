import './Loading.css'

const Loading = (color) => {
  return (
    <span className="container">
      <span className="loader">
        {
          [...Array(6)].map((_, index) => (
            <span key={index} style={{"--i": index, "backgroundColor":color }}></span>
          ))
        }
      </span>
    </span>
  );
};

export default Loading;
