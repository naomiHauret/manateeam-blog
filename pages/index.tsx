import { Client } from '@utils/prismic'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@utils/prismic'
import Link from 'next/link'
import { RichTextBlock } from 'prismic-reactjs'
interface IInternalLink {
  title: string,
  href: string
}
interface IPageHomeProps {
  content: {
    h1_title: string,
    main_text: RichTextBlock[],
    rich_text: RichTextBlock[],
  },
  articles: IInternalLink[]
}

const Page = ({ content, articles }: IPageHomeProps) => {
  return (
    <div>
      <h1>{content.h1_title}</h1>
      <nav className="py-10 my-30 border-solid border-1 border-neutral-300">
        <ul>
          {articles.map((article, i) => (
            <li key={i}>
              <Link href={article.href}>
                <a>{article.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <p>{content.main_text}</p>
      <div>
        <RichText render={content.rich_text} linkResolver={linkResolver} />
      </div>
    </div>
  )
}

interface IPageHome_GetStaticProps {
  locale: string
}

export async function getStaticProps({ locale }: IPageHome_GetStaticProps) {
  try {
    // Fetch all the articles
    const articles = await Client().query([Prismic.Predicates.at('document.type', 'article_page')])

    const listArticles = articles.results.map((article) => ({
      title: article.data.title,
      href: `/${article.uid}`,
    }))

    // Fetch the home page content
    const content = await Client().query([Prismic.Predicates.at('document.type', 'home_page')], {
      lang: locale,
    })

    return {
      props: {
        content: content.results[0].data,
        articles: listArticles,
      },
    }
  } catch (error) {
    // The API most likely died
    console.error(error)
    return {}
  }
}

export default Page
