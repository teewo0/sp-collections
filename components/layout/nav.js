import Link from 'next/link'
import { Fragment } from 'react'

//Icons from react-icons 
import { FiUser } from 'react-icons/fi'
import { HiOutlineShoppingCart } from 'react-icons/hi'

//Class module
import classes from './nav.module.css'

const Nav = () => {
	return (
		<nav className={classes.nav}>
			<Fragment>
				<Link href={'/login'}>
					<div className={classes.navLink}>
						<span className={classes.navLogo}>
							<FiUser />
						</span>
					</div>
				</Link>

				<Link href={'/cart'}>
					<div className={classes.navLink}>
						<span className={classes.navLogo}>
							<HiOutlineShoppingCart />
						</span>

					</div>
				</Link>

			</Fragment>
		</nav>
	)
}

export default Nav
