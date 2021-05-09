import { Client } from '@utils/prismic'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@utils/prismic'
import { RichTextBlock } from 'prismic-reactjs'

type Author = {
  name: 'timotej' | 'naomi',
}
type Article = {
  title: string,
  author: Author,
  content: RichTextBlock[],
}
interface IArticleProps {
  article: Article;
}

const Page = (props: IArticleProps) => {
  const {
    article: { title, author, content },
  } = props
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

interface IPageArticle_GetStaticProps {
  params: {
    article_slug: string,
  };
}

export async function getStaticProps({ params: { article_slug } }: IPageArticle_GetStaticProps) {
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
