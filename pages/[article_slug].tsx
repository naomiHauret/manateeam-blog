import { Client } from '@utils/prismic'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@utils/prismic'
import { RichTextBlock } from 'prismic-reactjs'

export type PageArticleProps = {
  title: string,
  author: 'Timotej' | 'Naomi',
  content: RichTextBlock[],
}

const Page = ({ article }) => {
  const { title, author, content }: PageArticleProps = article
  return (
    <div>
      <h1>{title}</h1>
      <h2>{author}</h2>
      <div>
        <RichText render={content} linkResolver={linkResolver} />
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const articles = await Client().query([Prismic.Predicates.at('document.type', 'article_page')])

  const all_articles = articles.results.map((element) => {
    return `/${element.uid}`
  })
  return {
    paths: all_articles,
    fallback: false,
  }
}

type PageArticle_GetStaticProps = {
  params: {
    article_slug: string,
  },
}

export async function getStaticProps({ params: { article_slug } }: PageArticle_GetStaticProps) {
  try {
    const article = await Client().getByUID('article_page', article_slug, {})
    return {
      props: {
        article: article.data,
      },
    }
  } catch (error) {
    return {}
  }
}

export default Page
