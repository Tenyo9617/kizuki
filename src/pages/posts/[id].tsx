import Date from "@/components/date";
import Head from "next/head";
import Layout from "../../components/layout";
import utilStyles from '../../styles/utils.module.css';
import { getAllPostIds, getPostData } from "../../lib/posts";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

type Params = {
  params: {
    id: string;
  };
};
export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
type Posts = {
  postData: {
    id: string;
    date: string;
    title: string;
    contentHtml: string;
  };
};
export default function Post({ postData }: Posts) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
