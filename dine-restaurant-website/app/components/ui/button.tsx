import { Link, type LinkProps } from 'react-router-dom'

interface ButtonProps extends LinkProps {}

export function Button(props: ButtonProps) {
	return <Link {...props} />
}
