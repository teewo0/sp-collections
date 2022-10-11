import { useContext } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'

import MobileNavContext from '../../context/mobile-nav-context'
import classes from './hamburger-menu.module.css'
const Hamburger = () => {
	const { showMobilePane } = useContext(MobileNavContext)




	return (
		<div className={classes.burger} onClick={showMobilePane}>
			<GiHamburgerMenu />
		</div>
	)
}

export default Hamburger
