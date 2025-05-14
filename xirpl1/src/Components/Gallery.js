import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
import data from "./data.json"; // Import data JSON

let id = 0;

class Portfolio extends Component {
  render() {
    if (!data) return null; // Kalau datanya nggak ada, nggak tampil

    const projects = data.projects.map(function (project) {
      let projectImage = project.image || "assets/img/huza.png";  // Default gambar jika nggak ada

      return (
        <div key={id++} className="columns portfolio-item">
          <div className="item-wrap">
            <Zmage alt={project.title} src={projectImage} />
            <div style={{ textAlign: "center" }}>{project.title}</div>
          </div>
        </div>
      );
    });

    return (
      <section id="gallery">
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="twelve columns collapsed">
              <h1>Our Random Pictures</h1>

              <div id="portfolio-wrapper" className="bgrid-quarters s-bgrid-thirds cf">
                {projects}
              </div>
            </div>
          </div>
        </Fade>
      </section>
    </section>
    );
  }
}

export default Portfolio;