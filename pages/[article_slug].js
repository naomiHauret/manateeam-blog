import { Client } from '@utils/prismic'
import Prismic from 'prismic-javascript'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '@utils/prismic'


const Page = (props) => {
    console.log(
props)
    const propsMod = props.article.data
    return (
        <div>
            <h1>{propsMod.title}</h1>
            <h2>{propsMod.author}</h2>
            <div>
              <RichText render={propsMod.content} linkResolver={linkResolver} />
            </div>
        </div>
    )
}


export async function getStaticPaths(){
    const articles = await Client().query([Prismic.Predicates.at('document.type', 'article_page')])
    console.log(articles)
    
    const all_articles = articles.results.map( (element) =>{
        return  `/${element.uid}`
    })
    return {
        paths: all_articles, fallback: false
    };    
}



export async function getStaticProps({ locale, params }) {
    try {
         const {article_slug} = params
         const article = await Client().getByUID('article_page', article_slug)
    return {
        props: {
            article
        }
    }
    
}
catch (error) {
    console.log("shit happens")
    return {}
  }
}

export default Page