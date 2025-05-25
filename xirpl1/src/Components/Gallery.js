import React, { Component } from "react";
import Masonry from "react-masonry-css";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { motion } from "framer-motion";  // v4.1.17
import "../assets/css/gallery.css";

const importAll = (r) => r.keys().map(r);
const images = importAll(
  require.context("../assets/img", false, /\.(png|jpe?g|svg)$/)
);

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
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      photoIndex: 0,
      shuffledImages: shuffleArray(images),
      hoveredIndex: null, // tambah state ini
    };
  }

  openLightbox = (index) => {
    this.setState({ isOpen: true, photoIndex: index });
  };

  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  render() {
    const { isOpen, photoIndex, shuffledImages, hoveredIndex } = this.state;

    return (
      <section id="gallery">
        <section id="portfolio">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="row">
              <div className="twelve columns collapsed">
                <h1>Our Random Pictures</h1>
                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                >
                  {shuffledImages.map((src, index) => (
                    <motion.div
                      key={index}
                      className="portfolio-item"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onMouseEnter={() => this.handleMouseEnter(index)}
                      onMouseLeave={this.handleMouseLeave}
                      style={{
                        opacity:
                          hoveredIndex === null || hoveredIndex === index ? 1 : 0.3,
                        transition: "opacity 0.5s",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        alt={`Image ${index + 1}`}
                        src={src.default || src}
                        onClick={() => this.openLightbox(index)}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </motion.div>
                  ))}
                </Masonry>

                {isOpen && (
                  <Lightbox
                    mainSrc={shuffledImages[photoIndex].default || shuffledImages[photoIndex]}
                    nextSrc={shuffledImages[(photoIndex + 1) % shuffledImages.length].default || shuffledImages[(photoIndex + 1) % shuffledImages.length]}
                    prevSrc={shuffledImages[(photoIndex + shuffledImages.length - 1) % shuffledImages.length].default || shuffledImages[(photoIndex + shuffledImages.length - 1) % shuffledImages.length]}
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (photoIndex + shuffledImages.length - 1) % shuffledImages.length,
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + 1) % shuffledImages.length,
                      })
                    }
                  />
                )}
              </div>
            </div>
          </motion.div>
        </section>
      </section>
    );
  }
}


export default Gallery;
