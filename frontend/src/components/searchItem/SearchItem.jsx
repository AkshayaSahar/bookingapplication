import "./searchItem.css";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config.js";

const SearchItem = ({item}) => {
  const photos = [
    "https://cdn.prod.website-files.com/63f5043a8590bf1a77215131/642d391faa79a9054efedaaf_11-p-500.webp",
    "https://cosy-cabin.hotels-essex.com/data/Pics/OriginalPhoto/11827/1182733/1182733003/cosy-cabin-stock-pic-21.JPEG"
  ]
  return (
    <div className="searchItem">
      <img
        src={photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">
         {item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
       { item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;