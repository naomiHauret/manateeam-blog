import { Client } from '@utils/prismic'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@utils/prismic'
import Link from 'next/link'
import { RichTextBlock } from 'prismic-reactjs'
import { fetchLatestGithubRepo } from '@lib/api'

interface IGithubRepository {
  name: string;
  html_url: string;
  description?: string;
}
interface IInternalLink {
  title: string;
  href: string;
}

interface IPageHomeProps {
  repositories: IGithubRepository[];
  content: {
    h1_title: string,
    section_repositories_title: string,
    main_text: RichTextBlock[],
    rich_text: RichTextBlock[],
  };
  articles: IInternalLink[];
}

const Page = ({ content, articles, repositories }: IPageHomeProps) => {
  return (
    <main>
      <h1>{content.h1_title}</h1>
      <section>
        <h2>{content.section_repositories_title}</h2>
        <ul>
          {repositories.map((repo, i) => (
            <li data-testid="repository" key={i}>
              {repo.name}
              <p>{repo.description}</p>
              <a href={repo.html_url}>{repo.name}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}

interface IPageHome_GetStaticProps {
  locale: string;
}

export async function getStaticProps({ locale }: IPageHome_GetStaticProps) {
  try {
    // Fetch Github repositories
    const repositories: [] = await fetchLatestGithubRepo()

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
        repositories: repositories.map((repository: IGithubRepository) => ({
          // Should be another type here that would fully describe a Github repository but oh well
          name: repository.name,
          html_url: repository.html_url,
          description: repository.description,
        })),
      },
    }
  } catch (error) {
    // The API most likely died
    console.error(error)
    return {}
  }
}

export default Page
