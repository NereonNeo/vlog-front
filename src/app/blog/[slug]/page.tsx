import { use } from "react";

type BlogItemPageParams = {
  slug: string;
};

type BlogItemPageProps = {
  params: Promise<BlogItemPageParams>;
};

export default function BlogItemPage(props: BlogItemPageProps) {
  const { params } = props;
  const { slug } = use(params);

  return <div>BlogItemPage {slug}</div>;
}
