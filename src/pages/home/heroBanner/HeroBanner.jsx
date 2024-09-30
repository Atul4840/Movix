import React, { useEffect, useState } from 'react'
import "./style.scss";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetch } from "../../../hooks/useFetch";
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';


const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home)
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  const searchQueryHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`)
    }
  }

  const searchInputHandler = (event) => {
    if (event.key === "Enter") {
      searchQueryHandler();
    }
  }

  return (
    <div className="heroBanner">
      {
        !loading && <div className="backdropImg">
          <Img src={background} />
        </div>
      }

      <div className="opacityLayer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome ok.</span>
          <span className="subTitle">Millions of movies, TV shows and people to discover. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder='Search for a movie or tv show....'
              onKeyUp={(event) => searchInputHandler(event)}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={() => searchQueryHandler()}>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  )
}

export default HeroBanner
