import "../featuredProperties/featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { API_BASE_URL } from "../../config.js";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/api/hotels?featured=true&limit=4`
  );
  const sampleImg = [
    "https://cdn.prod.website-files.com/63f5043a8590bf1a77215131/642d391faa79a9054efedaaf_11-p-500.webp",
    "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F92c1481e-33cc-4af5-860d-f4ff548a26d4_800x600.jpeg",
    "https://cosy-cabin.hotels-essex.com/data/Pics/OriginalPhoto/11827/1182733/1182733003/cosy-cabin-stock-pic-21.JPEG",
    "https://cf.bstatic.com/xdata/images/hotel/max1024x768/525248617.jpg?k=3945a7414a3bf6fd431ccc5b18efd4ad070a9cf78f775c64a9c19389e517e1d8&o=&hp=1",
    "https://scdn.aro.ie/Sites/50/wildlands2020/uploads/images/PanelImages/General/IMG_6435_new.jpg"

  ];
  return (
    <div className="fp">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {data.map((item, index) => (
            <div className="fpItem" key={item._id}>
              <img src={sampleImg[index]} alt="" className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
