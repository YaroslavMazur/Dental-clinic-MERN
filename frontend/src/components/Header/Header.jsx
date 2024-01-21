import React ,{useState} from 'react';
import css from "./Header.module.css";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const Header = () => {
	const [isMenuOpened, setIsMenuOpen] = useState(false);

	const toggleMenu = () =>{
		setIsMenuOpen(!isMenuOpened);
	}

	console.log("rerender");

   return (
      <header className={css.header}>
			<nav>
				<Link to="/" className = {css.logoLink}></Link>

				<ul className={css.mainList}>
					<li><Link to="/">Profile</Link></li>
					<li><Link to="/">About</Link></li>
					<li><Link to="/login">Log in</Link></li>
					<li><Link to="/registration">Sign up</Link></li>
				</ul>

				<Link to="/book" className={css.bookBtn}>Book</Link>

				<div className={css.hamburgerIcon} onClick={toggleMenu}>
					<div className={css.bar}></div>
					<div className={css.bar}></div>
					<div className={css.bar}></div>
				</div>
				
				{isMenuOpened &&(
					<ul className={css.openedMenu}>
						<li><Link to="/">Profile</Link></li>
						<li><Link to="/">About</Link></li>
						<li><Link to="/login">Sign in</Link></li>
						<li><Link to="/register">Sign up</Link></li>
					</ul>
				)

				}
			</nav>
		</header>
   )
}

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
