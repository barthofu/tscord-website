export const sanitizeCommands = (commands: any) => {

    const sanitizedCommands = []

    for (const command of commands) {

        const subcommandGroups = command.options.filter((option: any) => option.type === 2)
        const subcommands = command.options.filter((option: any) => option.type === 1)

        if (!subcommandGroups.length && !subcommands.length) sanitizedCommands.push(command)
        else {

            subcommands.forEach((subcommand: any) => {
                subcommand.name = `${command.name} ${subcommand.name}`
                sanitizedCommands.push(subcommand)  
            })

            subcommandGroups.forEach((subcommandGroup: any) => {
                subcommandGroup.options.forEach((option: any) => {
                    option.name = `${command.name} ${subcommandGroup.name} ${option.name}`
                    if (option.type === 1) sanitizedCommands.push(option)
                }) 
            })
        }
    }

    return sanitizedCommands.map(sanitizeCommand => ({
        name: sanitizeCommand.name,
        description: sanitizeCommand.name.endsWith(sanitizeCommand.description) ? '' : sanitizeCommand.description,
    }))
}