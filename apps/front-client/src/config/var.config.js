const vars = {
    env: process.env.REACT_APP_ENV || 'development',
    title: process.env.REACT_APP_TITLE || 'Scrap Frontier',
    serverURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:3001/',
    appDomain: process.env.NEXT_PUBLIC_APP_DOMAIN || 'http://127.0.0.1/',
    projectId: process.env.REACT_APP_WAGMI_PROJECT_ID || '',
    nftContractAddress: process.env.REACT_APP_NFT_CONTRACT_ADDR || '0x0',
    alchemyAPIKey: process.env.REACT_APP_ALCHEMY_KEY || ''
}

export default vars