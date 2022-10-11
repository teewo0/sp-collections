import { Fragment, useContext } from 'react'

import Logo from './logo'
import Nav from './nav'
import MobileNavContext from '../../context/mobile-nav-context'
import MobileNav from './mobile-nav'
import Hamburger from './hamburger-menu'
import classes from './header.module.css'

const Header = () => {
	const { mobilePane } = useContext(MobileNavContext)
	return (
		<header className={classes.header}>
			<Fragment>
				<Hamburger />
				<Logo />
				<Nav />
				{mobilePane && <MobileNav />}
			</Fragment>
		</header>
	)
}

export default Header
