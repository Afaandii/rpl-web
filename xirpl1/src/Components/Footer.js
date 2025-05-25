  import React, { Component } from "react";
  import Fade from "react-reveal";
  import "../assets/css/footer.css";

  class Footer extends Component {
    render() {
      if (!this.props.data) return null;

      const networks = this.props.data.social.map(function (network) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });

      return (
        <footer>
          <div className="row">
            <Fade bottom>
              <div className="twelve columns">
                <ul className="copyright">
                  <li>&copy; Copyright 2024-2025 XI RPL 1</li>
                  <li>
                    Designed and developed by{" "}
                    <a title="kHuza" href="http://www.instagram.com/huzawastaken">
                      hxza
                    </a>
                  </li>
                </ul>
              </div>
            </Fade>

            <div id="go-top">
              <a className="smoothscroll" title="" href="#home">
                <i className="icon-up-open"></i>
              </a>
            </div>
          </div>
        </footer>
      );
    }
  }

  export default Footer;
