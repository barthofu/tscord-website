type BotData = {
    info: {
        name: string
        discriminator: string
        iconUrl: string
    }
    totals: {
        stats: {
            totalUsers: number
            totalGuilds: number
            totalActiveUsers: number
            totalCommands: number
        }
    }
    commands: {
        name: string
        description: string
    }[]
}