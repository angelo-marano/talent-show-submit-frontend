import React from 'react'
import Helmet from 'react-helmet'
import { Waypoint } from 'react-waypoint'
import Layout from '../components/layout'
import SubmissionForm from '../components/SubmissionForm'
import Nav from "../components/Nav";

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

        <Nav sticky={this.state.stickyNav} />

        <div id="main">

          <section id="intro" className="main special">
            <header className="major">
            <h2>Helping Our Heroes: Creative Expressions of our Youth</h2>
            </header>
            <p className="content">
            On May 28th, at 4:00 PM, people will be asked to stream live to (again name the site) to view the performances of all fifty children. As well, there will be direct links to both Thomas Jefferson Hospital and Inspira where people watching can make a donation in appreciation of our fifty community service volunteers who have submitted their acts of self expression in honor of our Heroes on the frontlines serving tirelessly to fight COVID-19.
The first 50 acts submitted will be placed in the show with more details to follow.  
<br></br>It is hoped that this will provide an enriching experience for all the children involved and act as an inspiration to those on the frontlines.  As well, it is hoped that it will serve a constructive form of entertainment for many throughout Washington Twp.  
All acts must be apolitical in nature and performed by children in the home. (no neighbors).  It is important that we maintain the guidelines set forth by the "stay at home" order currently in place, as this is in support of hospital workers.
            </p>
          </section>

          <section id="submissionform" className="main" style={this.sectionStyle}>
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Helping Our Heroes: Creative Expressions of our Youth</h2>
                  <h3>Submission Form</h3>
                </header>
                
                <p className="content">
                  Please submit a video approximately one minute in length for consideration for our stream on May 28th at 4 PM.
                </p>

                <p className="content">
                  The first 50 submissions will be considered. For more details, visit <a href="#">this site</a>
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
