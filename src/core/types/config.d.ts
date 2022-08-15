type Config = {

    site: {
        title: string | null
        description: string
        icon: string | null
    }

    links: {
        discordInvite: string
        footer: { name: string, url: string }[]
    }

    articlesPath: string

}