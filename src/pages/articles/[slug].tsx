import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import { Box, Flex, Image, Text } from "@chakra-ui/react"
import { AiFillHome } from "react-icons/ai"
import Link from "next/link"
import fs from 'fs'

import config from "@config"
import matter from "gray-matter"
import Head from "next/head"

const defaultArticlePageIcon = 'https://cdn-icons-png.flaticon.com/512/3500/3500995.png'

type ArticlePageProps = {
    article: ArticleData
}

const ArticlePage: NextPage<ArticlePageProps> = ({ article }) => {

    return (<>

        <Head>
			<title>{article.title}</title>
            {article.description && <meta
				name="description"
				content={article.description}
			/>}
			<link rel="icon" type="image/png" href={config.site.icon || defaultArticlePageIcon} />
		</Head>

        <Flex w='full' flexDirection='column' alignItems='center' justifyContent='center' py='5em'>

            <Link href='/'>
                <Text 
                    fontSize='3xl' 
                    mb='1em' 
                    color='gray.200' 
                    cursor='pointer'
                    transition='.2s linear'
                    _hover={{ opacity: '.7' }}
                >
                    <AiFillHome />
                </Text>
            </Link>

            <Box 
                w={{ base: '90vw', lg: '60vw' }} 
                bg='#29292C'
                borderRadius='2xl'
                overflow='hidden'
            >
                {article.coverUrl &&
                    <Image
                        src={article.coverUrl}
                        alt={article.title}
                        width='100%'
                        maxH='300px'
                        objectFit='cover'
                        objectPosition='0 -20px'
                        sx={{
                            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                        }}
                    >

                    </Image>
                }

                <Box p={{ base: '2em', lg: '2em 4em 4em 4em' }}>

                    <Text as='h1' fontSize={{ base: '3xl', lg: '5xl' }} fontWeight='bold'>
                        {article.title}
                    </Text>
                    <Text as='h3' fontSize={{ base: 'md', lg: 'lg' }} fontWeight='regular' mb='2em' opacity='.7' fontStyle='italic'>
                        By {article.authorUrl ? 
                                <Text as='a' 
                                    href={article.authorUrl} 
                                    color='#fff' fontWeight='semibold'
                                    _hover={{
                                        textDecoration: 'underline',
                                    }}    
                                >{article.author}</Text>
                            : article.author
                        }
                        {article.date && ` - ${article.date}`}
                    </Text>

                    <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]}
                        remarkPlugins={[remarkGfm]}
                        components={ChakraUIRenderer()}
                    >
                        {article.content}
                    </ReactMarkdown>
                </Box>
            </Box>
        </Flex>
    </>)
}

export default ArticlePage

export const getStaticProps: GetStaticProps = async ({ params })=> {

    const { slug } = params!
    if (!slug) throw new Error('Bad parameters: no \'slug\'')

    const filePath = `${config.articlesPath}/${slug}`
    let fileContent: string
    try {
        fileContent = fs.readFileSync(filePath + '.md', 'utf8')
    } catch (e) {
        try {
            fileContent = fs.readFileSync(filePath + '.mdx', 'utf8')
        }
        catch (e) {
            throw new Error('Article not found')
        }
    }

    const { data, content } = matter(fileContent)
    
    const article = {
        slug,
        content,
        ...data
    } as ArticleData
    
    return {
        props: {
            article
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {

    const files = fs.readdirSync(config.articlesPath).filter(file => !file.startsWith('.') || !file.startsWith('_'))
    const slugs = files.map((fileName: string) => fileName.replace(/\.mdx?$/, ''))

    const paths = slugs.map(slug => ({
        params: {
            slug
        }
    }))

    return {
        paths,
        fallback: false
    }
}