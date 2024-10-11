import { forwardRef, type ComponentPropsWithoutRef } from 'react'

export interface PictureProps extends ComponentPropsWithoutRef<'picture'> {}

export const Picture = forwardRef<HTMLPictureElement, PictureProps>(
	(props, ref) => {
		return <picture ref={ref} {...props} />
	},
)

export interface SourceProps extends ComponentPropsWithoutRef<'source'> {
	images?: [Image, ...Image[]]
}

export const Source = forwardRef<HTMLSourceElement, SourceProps>(
	({ images, ...props }, ref) => {
		return <source ref={ref} {...getSourceProps(images)} {...props} />
	},
)

function getSourceProps(
	images: SourceProps['images'],
): ComponentPropsWithoutRef<'source'> {
	if (images === undefined) {
		return {}
	} else {
		return {
			srcSet: getSrcSet(images),
			width: images[0].metadata.width,
			height: images[0].metadata.height,
		}
	}
}

export interface ImgProps extends ComponentPropsWithoutRef<'img'> {
	alt: string
	images?: [Image, ...Image[]]
	priority?: boolean
}

export const Img = forwardRef<HTMLImageElement, ImgProps>(
	({ images, priority, ...props }, ref) => {
		const imagesProps = getImagesProps(images)

		return (
			<img
				ref={ref}
				loading={priority ? 'eager' : 'lazy'}
				{...imagesProps}
				{...props}
			/>
		)
	},
)

export interface Image {
	metadata: {
		src: string
		width: number
		height: number
	}
	density: `${number}x`
}

function getSrcSet(images: Image[]) {
	return images
		.map((image) => `${image.metadata.src} ${image.density}`)
		.join(', ')
}

function getImagesProps(images: ImgProps['images']) {
	if (images === undefined) {
		return {}
	} else {
		return {
			src: images[0].metadata.src,
			width: images[0].metadata.width,
			height: images[0].metadata.height,
			...getSrcSetProp(images),
		}
	}
}

function getSrcSetProp(
	images: Image[],
): Pick<ComponentPropsWithoutRef<'img'>, 'srcSet'> {
	if (images.length <= 1) {
		return {}
	} else {
		return {
			srcSet: getSrcSet(images),
		}
	}
}
