import { mode } from "@chakra-ui/theme-tools"

const styles = {

    global: (props: any) => ({

        body: {
            bg: 'secondary',
            fontFamily: "DM Sans",
        },
        html: {
            fontFamily: 'DM Sans',
        },

        // scrollbar 
        
        '::-webkit-scrollbar': {
            width: '5px'
        },
        '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: 'gray.600',
        },
        '::-webkit-scrollbar-track': {
            background: 'rgba(0, 0, 0, 0)'
        }
        
    })
}

export default styles