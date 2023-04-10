import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';



export const client = createClient({
    projectId:'mirytfpe',
    dataset: 'production',
    apiVersion: '2023-04-03' ,
    useCdn: true,
    token:'skTJ1exZK3TvWz3EVAYWp1cFAnbq5gcBWsViR1jaKpGPAyQKDhK6wBBaeMtwpbOgUkKGXbhEHoS57FDPD0UyyN1AmUzTLqHfwHLvZsPKvz9nqmCyEIiQwL9V8TQUADlx18e2qkfBKa6aJM2z0rWsYBXXSl1ci9CpS22MXAcSW99OBJgrsaZ4',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
 