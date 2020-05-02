import { Link } from 'gatsby'
import React from 'react'
import Helmet from 'react-helmet'
import { Waypoint } from 'react-waypoint'
import pic01 from '../assets/images/pic01.jpg'
import Header from '../components/Header'
import Layout from '../components/layout'
import Nav from '../components/Nav'
import SubmissionForm from '../components/SubmissionForm'
import StepWizard from "react-step-wizard";

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      stickyNav: false,
    }
  }

  sectionStyle = {
    marginTop: "50px"
  }

  _handleWaypointEnter = () => {
    this.setState(() => ({ stickyNav: false }))
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }))
  }

  render() {
    return (
      <Layout>
        <Helmet title="Talent Show Submission" />

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        ></Waypoint>

        <div id="main">
          <section id="intro" className="main" style={this.sectionStyle}>
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Washington Township Talent Show</h2>
                </header>
                <p>
                  Sed lorem ipsum dolor sit amet nullam consequat feugiat
                  consequat magna adipiscing magna etiam amet veroeros. Lorem
                  ipsum dolor tempus sit cursus. Tempus nisl et nullam lorem
                  ipsum dolor sit amet aliquam.
                </p>

                <div>
                  <SubmissionForm></SubmissionForm>
                </div>

              </div>
            </div>
          </section>
        </div>
      </Layout>
    )
  }
}

export default Index
