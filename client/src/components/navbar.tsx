const NavBar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
			<div className="container-fluid">
				<div className="navbarLayout">
					<a className="navbar-brand" href="/">
						Blog app
					</a>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a
								className="nav-link"
								aria-current="page"
								href="/"
							>
								Home
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="/login">
								Login
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
