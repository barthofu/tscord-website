import { Flex, Text, Heading, Image, useBreakpointValue, Box, Link } from '@chakra-ui/react'
import config from '@config'
import React from 'react'

import { Parallax } from 'react-scroll-parallax'

const parallaxSpeed = -40

type HeroBannerProps = {
    iconUrl: string
    title: string
    description: string
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ iconUrl, title, description }) => {

    const iconSize = useBreakpointValue({ base: '6em', sm: '6em', md: '8em', lg: '10em' })

	return (<>

        <Box 
            as="section" 
            zIndex={-1} 
            sx={{ transformStyle: "preserve-3d" }}
            w='100%'
        >    

            <Box
                as={Parallax}
                speed={parallaxSpeed}
                bgImage='/assets/images/heroBackground.svg'
                position="absolute"
                inset={0}
                bgSize='30em'
                bgPosition="top 1.75rem center"
                opacity={0.125}
                zIndex={-1}
                w='100%'
            />
            
            <Box
                as={Parallax}
                speed={parallaxSpeed}
                position="absolute"
                inset={0}
                bgGradient="linear-gradient(to top, var(--chakra-colors-secondary), transparent)"
                
            />

            <Flex
                as={Parallax}
                speed={parallaxSpeed / 2}
                position="relative"
                direction="column"
                alignItems="center"
                justifyContent="center"
                mx="auto"
                px={6}
                w="full"
                maxW={{
                base: "340px",
                md: "lg",
                lg: "container.sm",
                }}
                height="100vh"
            >

                <Image
                    src={iconUrl}
                    alt={title + ' logo'}
                    w={iconSize} h={iconSize}
                    borderRadius='50%'
                    mb='24px'
                />

                <Heading
                    as="h2"
                    mb={6}
                    fontFamily='Dystopian'
                    fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
                    lineHeight="95%"
                    textAlign="center"
                >
                    {title}
                </Heading>

                <Text
                    mb={12}
                    maxW="container.lg"
                    color="white.200"
                    opacity='0.45'
                    fontSize={{ base: "lg", lg: "2xl" }}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily='Inter var,Inter,sans-serif'
                    lineHeight={{ base: "125%", md: "115%" }}
                >
                    {description}
                </Text>

                <Link
                    p='20px'
                    bg='discord.500'
                    borderRadius='12px'
                    size={useBreakpointValue({ base: "md", md: "xl", xl: "2xl" })}
                    fontWeight="bold"
                    _hover={{ bg: 'discord.600' }}
                    href={config.links.discordInvite}
                    target="_blank"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Text fontFamily='Inter var,Inter,sans-serif' fontWeight='bold' color='white'>Add to Discord</Text>
                </Link>

            </Flex>

        
        
        </Box>
    </>)
}