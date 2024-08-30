import { cx } from 'class-variance-authority'

export const center = 'center-[76rem] center-gutter-6 tablet:center-gutter-10'
export const shadowyBlue =
	'bg-blue text-white shadow-[inset_0_-0.125rem_0_0.1875rem_hsl(244_76%_23%),inset_0_0.0625rem_0_0.375rem_hsl(223_100%_62%)]'
export const blueButton = cx(
	shadowyBlue,
	'transition-colors hocus:bg-[hsl(223,100%,68%)]',
)
const pinkGradient = 'bg-gradient-to-b from-pink to-light-blue'
export const pinkButton = cx('from-[0.625rem] text-white', pinkGradient)
export const pinkCircleButton = (
	props: { elementCenter?: boolean } = { elementCenter: false },
) =>
	cx(
		'group relative inline-grid size-10 place-items-center rounded-full from-15% shadow-[inset_0_-0.3125rem_0_-0.0625rem_hsl(274_91%_57%/25%)] tablet:size-16 tablet:shadow-[inset_0_-0.375rem_0_0.4375rem_hsl(274_91%_57%/25%)] desktop:size-[5.875rem]',
		props.elementCenter ? '' : 'pb-1 tablet:pb-[0.8125rem]',
		pinkGradient,
	)
export const dialog =
	'rounded-[3rem] bg-gradient-to-b from-[hsl(230_56%_47%)] to-[hsl(230_100%_24%/83%)] shadow-[inset_0_-0.5rem_0_0.25rem_hsl(244_76%_23%),inset_0_0.375rem_0_0.5rem_hsl(223_100%_57%)]'
