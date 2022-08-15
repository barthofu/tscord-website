import { Box, Link, useColorModeValue, Image, Stack, Heading, Text, Flex, Button } from '@chakra-ui/react'
import React, { useState } from 'react'
import NextLink from 'next/link'
import { motion } from 'framer-motion'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'

import { Card, PopBox } from '@components/shared'

const MotionBox = motion(Box)

type LatestArticlesProps = {
    articles: SanitizedArticleData[]
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ articles }) => {

    const [expanded, setExpanded] = useState(false)
    const getHeight = () => expanded ? '100 %' : '80vh'

	return (<>
        <Box
            position="relative"
            overflow="hidden"
            maxW={{ base: "container.sm", md: "container.md", lg: "container.lg" }}
            maxH={getHeight()}
        >
            <PopBox
                gap={{ base: 6, lg: 8 }}
                mt={{ base: -2, md: -4 }}
                sx={{
                    columnCount: [1, 1, 2],
                    breakInside: "avoid",
                }}
            >
                {articles.map((article, i) => (<Box key={i}>
                    <ArticlePreview article={article} />
                </Box>))}
                
            </PopBox>

            <MotionBox
                position="absolute"
                inset={-1}
                bgGradient="linear-gradient(to top, var(--chakra-colors-secondary), rgba(39, 39, 42, 0))"
                zIndex="1"
                pointerEvents="none"
                initial={{ opacity: 0 }}
                animate={{ opacity: expanded ? 0 : 1 }}
            />

        </Box>

        <Flex alignItems="center" justifyContent="center" mt='5em' z-index='1'>
            <Button
                bg='primary'
                mb={8}
                onClick={() => setExpanded(!expanded)}
                rightIcon={expanded ? <IoIosArrowUp /> : <IoIosArrowDown />}
            >
                {expanded ? "Show less" : "Show more"}
            </Button>
        </Flex>
    </>)
}

type ArticlePreviewProps = {
    article: SanitizedArticleData
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {

    return (<>
        <Link
            as={NextLink}
            key={article.slug}
            href={`/articles/${article.slug}`}
            w="full"
            _hover={{ textDecoration: "none" }}
            cursor='pointer'
        >
            <Card
                cursor='pointer'
                role="group"
                my={{ base: 2, md: 3, lg: 4 }}
                w="full"
                transition='0.25s linear'
                _hover={{ bg: 'tertiary', transform: 'scale(0.98)' }}
                display='inline-flex'
                flexDirection='column'
                justifyContent='start'
                alignItems='start'
                p={0}
                borderRadius='2xl'
                overflow="hidden"
                bg='primary'
            >
                {article.coverUrl && (
                    <Image
                        w="full"
                        src={article.coverUrl}
                        alt={article.title}
                        borderTopLeftRadius="2xl"
                        borderTopRightRadius="2xl"
                    />
                )}
                <Stack px={{ base: 8, sm: 10 }} py={7}>
                    <Heading as="h4" fontSize="2xl" fontFamily="Dystopian" my='.5em'>
                        {article.title}
                    </Heading>
                    {article.description && (
                        <Text 
                            opacity='0.6'
                            fontFamily='Inter var,Inter,sans-serif !important'
                            fontWeight='semibold'
                        >
                            {article.description}
                        </Text>
                    )}
                </Stack>
            </Card>
        </Link>
    </>)
}