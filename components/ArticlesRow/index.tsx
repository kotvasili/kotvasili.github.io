import Image from "next/image";
import styles from './ArticlesRow.module.sass'
import {motion} from "framer-motion";
import {IArticle} from "@/contentful/generated/types";
import {CustomImage} from "@/components/CustomImage";

export const ArticlesRow = ({articles }: {articles: IArticle[]}) => {

    return <motion.div className={styles.articles} initial={{opacity: 0, y: '30%'}} animate={{opacity: 1, y: 0}} transition={{delay: 2.5, duration: 0.5}}>
        <ul>
            <li>
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
            </li>
            <li>
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
            </li>
        </ul>
        <ul>
            <li>
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
            </li>
            <li>
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
                {articles.map((article) => (
                    <a href={article.fields.link} key={article.fields.title} target='_blank'>
                        <CustomImage {...article.fields.image}/>
                    </a>
                ))}
            </li>
        </ul>
</motion.div>
}
