import { type Metadata, type ResolvingMetadata } from "next";

export type PageProps<Params> = { params: Promise<Params> };

export type GenerateStaticParams<
  Props extends PageProps<Params>,
  Params = unknown,
> = () => Promise<Awaited<Props["params"]>[]>;

export type GenerateMetadata<PageProps> = (
  props: PageProps,
  parent: ResolvingMetadata,
) => Promise<Metadata>;
