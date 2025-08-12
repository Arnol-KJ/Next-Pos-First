import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest{
    return {
        name : 'My Point Of Sell',
        short_name : 'MYPOS',
        description: 'Just pos For sale',
        start_url : '/',
        display : 'standalone',
        icons :[
            {
                src : '/logo.png',
                sizes : '192x192',
                type : 'image/png'
            },
            {
                src : '/logo.png',
                sizes : '512x512',
                type : 'image/png'
            }
        ]
    }
}