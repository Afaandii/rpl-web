import React, { Component } from "react";
import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
      shuffledImages: shuffleArray(images),
      hoveredIndex: null,
      imagesLoadedCount: 0,
    };
    this.masonryRef = React.createRef();
  }

  handleMouseEnter = (index) => {
    this.setState({ hoveredIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoveredIndex: null });
  };

  handleImageLoad = () => {
    this.setState(
      (prev) => ({ imagesLoadedCount: prev.imagesLoadedCount + 1 }),
      () => {
        // Setelah setiap gambar load, trigger re-layout masonry dengan forceUpdate
        // Karena react-masonry-css tidak expose method layout,
        // kita bisa paksa re-render komponen masonry dengan state
        if (this.masonryRef.current) {
          this.masonryRef.current.forceUpdate();
        }
      }
    );
  };

  render() {
    const { shuffledImages, hoveredIndex } = this.state;

    return (
      <section id="gallery">
        <section id="portfolio">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="row">
              <div className="twelve columns collapsed">
                <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
                  Our Random Pictures
                </h1>

                <Masonry
                  breakpointCols={breakpointColumnsObj}
                  className="my-masonry-grid"
                  columnClassName="my-masonry-grid_column"
                  ref={this.masonryRef}
                >
                  {shuffledImages.map((src, index) => (
                    <motion.div
                      key={index}
                      className="portfolio-item"
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      onMouseEnter={() => this.handleMouseEnter(index)}
                      onMouseLeave={this.handleMouseLeave}
                      style={{
                        opacity:
                          hoveredIndex === null || hoveredIndex === index
                            ? 1
                            : 0.3,
                        transition: "opacity 0.3s ease",
                        cursor: "pointer",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      <LazyLoadImage
                        src={src.default || src}
                        alt={`Image ${index + 1}`}
                        effect="blur"
                        onLoad={this.handleImageLoad}
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                          borderRadius: "8px",
                        }}
                      />
                    </motion.div>
                  ))}
                </Masonry>
              </div>
            </div>
          </motion.div>
        </section>
      </section>
    );
  }
}

export default Gallery;
