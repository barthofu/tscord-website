import { Box, Flex, Heading, SimpleGrid, VStack } from '@chakra-ui/react'
import type { GetStaticProps, NextPage } from 'next'
import { HiOutlineCode } from 'react-icons/hi'
import { FaUserFriends } from 'react-icons/fa'
import { SiClubhouse } from 'react-icons/si'
import matter from 'gray-matter'
import fs from 'fs'
import Head from 'next/head'

import { HeroBanner, HomeStat, LandingSection, Commands, LatestArticles, Footer } from '@components/modules'
import config from '@config'
import { sanitizeCommands } from '@core/utils'

type Props = {
	botData: BotData
	articles: SanitizedArticleData[]
}

const HomePage: NextPage<Props> = ({ botData, articles }) => {
	
	const title = config.site.title || botData.info.name

	return (<>
		<Head>
			<title>{title}</title>
			<meta
				name="description"
				content={config.site.description}
			/>
			<link rel="icon" type="image/png" href={config.site.icon || botData.info.iconUrl} />
		</Head>

		<VStack 
			spacing={{ base: '4em', lg: '10em' }}
			direction="column"
			justifyContent="center"
			alignItems="center"
			overflowX="hidden"
			overflowY="scroll"
			sx={{
				perspective: "2px",
				transformStyle: "preserve-3d",
				scrollBehavior: "smooth",
			}}
		>
			<HeroBanner
				title={title}
				iconUrl={botData.info.iconUrl}
				description={config.site.description}
			/>

			<LandingSection
				title='Your feature #1'
				image='https://i.imgur.com/LjoutQ7.png'
				alt='Test'
				text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			/>

			<LandingSection
				title='Your feature #2'
				image='https://i.imgur.com/LjoutQ7.png'
				alt='Test'
				text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
				isImgFirst={true}
			/>

			<LandingSection
				title='Your feature #3'
				image='https://i.imgur.com/LjoutQ7.png'
				alt='Test'
				text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
			/>

			<Box p='2em'>

				<Flex justifyContent="center" alignItems="center" mb='5em'>
					<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em'>
						Some stats
					</Heading>
				</Flex>

				<SimpleGrid columns={{ base: 1, lg: 3 }} gap={{ base: 6, lg: 20 }}>

					<HomeStat
						label='Guilds'
						value={botData.totals.stats.totalGuilds}
						icon={<SiClubhouse />}
						color='#7A4069'
					/>

					<HomeStat
						label='Users'
						value={botData.totals.stats.totalUsers}
						icon={<FaUserFriends />}
						color='#513252'
					/>

					<HomeStat
						label='Commands'
						value={botData.totals.stats.totalCommands}
						icon={<HiOutlineCode />}	
						color='#CA4E79'
					/>
							
				</SimpleGrid>
			</Box>

			<Box p='2em'>

				<Flex justifyContent="center" alignItems="center" mb='5em !important'>
					<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em'>
						Commands
					</Heading>
				</Flex>

				<Commands commands={botData.commands}/>

			</Box>

			{articles.length > 0 &&
			
				<Box p='2em'>

					<Flex justifyContent="center" alignItems="center" mb='5em !important'>
						<Heading display='flex' alignItems='center' fontFamily='Dystopian' as="h2" size="2xl" mx='1em' textAlign='center'>
							Discover latest news
						</Heading>
					</Flex>

					<LatestArticles articles={articles} />

				</Box>
			}

			<Footer />

		</VStack>
	</>)
}

export const getStaticProps: GetStaticProps = async (ctx) => {

	let botData: BotData

	const apiUrl = process.env['API_URL']
  	const apiToken = process.env['API_TOKEN']

	const infoRes = await fetch(new URL('/bot/info?logIgnore=true', apiUrl), { headers: { 'Authorization': `Bearer ${apiToken}` } })
	if (!infoRes.ok) throw new Error(infoRes.statusText)
	const info = await infoRes.json()

	const totalsRes = await fetch(new URL('/stats/totals?logIgnore=true', apiUrl), { headers: { 'Authorization' : `Bearer ${apiToken}` } })
	if (!totalsRes.ok) throw new Error(totalsRes.statusText)
	const totals = await totalsRes.json()

	const commandsRes = await fetch(new URL('/bot/commands?logIgnore=true', apiUrl), { headers: { 'Authorization' : `Bearer ${apiToken}` } })
	if (!commandsRes.ok) throw new Error(commandsRes.statusText)
	const commands = await commandsRes.json()

	botData = {
		info: {
			name: info.user.username,
			discriminator: info.user.discriminator,
			iconUrl: info.user.displayAvatarURL
		},
		totals: totals,
		commands: sanitizeCommands(commands)
	}

	const files = fs.readdirSync(config.articlesPath).filter(file => !file.startsWith('.') || !file.startsWith('_'))

	const articles = files.map((fileName: string) => {

		const slug = fileName.replace(/\.mdx?$/, '')

		const filePath = `${config.articlesPath}/${fileName}`
		const fileContents = fs.readFileSync(filePath, 'utf8')
		const { data } = matter(fileContents)

		const article = {
			slug,
			...data
		} as SanitizedArticleData

		return article
	})

	return {
		props: {
			botData,
			articles
		},
		revalidate: 24 * 60 * 60 // each 24 hour
	}
}

export default HomePage