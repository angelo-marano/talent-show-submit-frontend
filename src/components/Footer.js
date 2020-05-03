import { Link } from 'gatsby'
import React from 'react'

const Footer = props => (
  <footer id="footer">
    <section>
      <h2></h2>
      <p>
      </p>
    </section>
    <section>
      <h2>Keyshake Corporation</h2>
      <dl className="alt">
        <dt>Address</dt>
        <dd>51 Bryant Road &bull; Turnersville, NJ 08012 &bull; USA</dd>
        <dt>Phone</dt>
        <dd>609.759.0311</dd>
        <dt>Email</dt>
        <dd>
          <a href="https://codebushi.com">sales@keyshake.io</a>
        </dd>
      </dl>
      <ul className="icons">
        <li>
          <a
            href="https://github.com/angelo-marano"
            className="icon fa-github alt"
          >
            <span className="label">GitHub</span>
          </a>
        </li>
      </ul>
    </section>
    <p className="copyright">
      &copy; Keyshake Corporation. Design: <a href="https://html5up.net">HTML5 UP</a>.
    </p>
  </footer>
)

export default Footer
