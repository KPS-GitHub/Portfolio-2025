import React from 'react'

import './variables.css'
import './global.css'
import Seo from './seo'
import Navigation from './navigation'
import Footer from './footer'
class Template extends React.Component {
  render() {
    const { children, me } = this.props

    return (
      <>
        <Seo />
        <Navigation me={me} />
        <main>{children}</main>
        <Footer />
      </>
    )
  }
}

export default Template
