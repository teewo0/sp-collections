import { useState, useContext } from 'react'
import MobileNavContext from '../../context/mobile-nav-context'
import classes from './mobile-nav.module.css'

const MobileNav = () => {
	// slideOutAnimation
	const { hideMobilePane, mobilePane } = useContext(MobileNavContext)


	return (
		<div className={classes.container}>
			<div className={classes.navPane}></div>
			<button className={classes.closeNavBtn} onClick={hideMobilePane}>
				X
			</button>
		</div>
	)
}

export default MobileNav
