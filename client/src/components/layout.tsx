import { ReactNode } from "react";

interface ILayoutProps {
	children?: ReactNode;
}

const Layout = (props: ILayoutProps) => {
	return <div className="Layout">{props.children}</div>;
};

export default Layout;
