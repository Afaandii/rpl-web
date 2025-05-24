import React, { Component } from "react";
import Fade from "react-reveal";
import Masonry from "react-masonry-css";
import '../assets/css/gallery.css';

// import gambar lokal
const importAll = (r) => r.keys().map(r);
const images = importAll(require.context("../assets/img", false, /\.(png|jpe?g|svg)$/));

// shuffle gambar
function shuffleArray(array) {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

class Gallery extends Component {
  render() {
    const shuffledImages = shuffleArray(images);

    return (
      <section id="gallery">
        <section id="portfolio">
          <Fade top duration={1000} distance="40px">
            <div className="row">
              <div className="twelve columns collapsed">
                <h1>Our Random Pictures</h1>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {shuffledImages.map((src, index) => (
                    <div key={index} className="portfolio-item">
                      <img
                        alt={` ${index + 1}`}
                        src={src.default || src}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <div style={{ textAlign: "center" }}>{``}</div>
                    </div>
                  ))}
                </Masonry>
              </div>
            </div>
          </Fade>
        </section>
      </section>
    );
  }
}

export default Gallery;