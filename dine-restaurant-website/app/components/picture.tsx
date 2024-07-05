import {
	type HTMLAttributes,
	type ImgHTMLAttributes,
	type SourceHTMLAttributes,
} from 'react'

export interface Image {
	src: string
	width: number
	height: number
}

export interface PictureProps extends HTMLAttributes<HTMLPictureElement> {}

export function Picture(props: PictureProps) {
	return <picture {...props} />
}

export interface SourceProps extends SourceHTMLAttributes<HTMLSourceElement> {
	image: Image
}

export function Source({ image, ...props }: SourceProps) {
	return (
		<source
			srcSet={image.src}
			width={image.width}
			height={image.height}
			{...props}
		/>
	)
}

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	alt: string
	image: Image
	priority?: boolean
}

export function Image({ image, priority, ...props }: ImageProps) {
	return (
		<img
			src={image.src}
			width={image.width}
			height={image.height}
			loading={priority ? 'eager' : 'lazy'}
			{...props}
		/>
	)
}

export interface DImage {
	image: Image
	density: `${number}x`
}

function getSrcSet(images: DImages) {
	return images
		.map((dImage) => `${dImage.image.src} ${dImage.density}`)
		.join(', ')
}

export type DImages = [DImage, ...DImage[]]

export interface DensitySourceProps extends Omit<SourceProps, 'image'> {
	images: DImages
}

export function DensitySource({ images, ...props }: DensitySourceProps) {
	return (
		<Source image={images[0].image} srcSet={getSrcSet(images)} {...props} />
	)
}

export interface DensityImageProps extends Omit<ImageProps, 'image'> {
	images: DImages
}

export function DensityImage({ images, ...props }: DensityImageProps) {
	return <Image image={images[0].image} srcSet={getSrcSet(images)} {...props} />
}
