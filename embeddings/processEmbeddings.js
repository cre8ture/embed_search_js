import {embed} from './transformerJsEmbeddings.js'

// export default async function processText(textArray, source="unknown") {
//     let chunks = []
//     textArray.forEach(async (text) => {
//         const embedding = await embed(text);
//         const chunkObject = {
//             embedding: embedding,
//             content: text,
//             fileSource: source,
//         };
//         chunks.push(chunkObject);
//     })
//     return chunks;
// }


export default async function processText(textArray, source="unknown") {
    const chunks = await Promise.all(textArray.map(async (text) => {
        const embedding = await embed(text);
        return {
            embedding: embedding,
            content: text,
            fileSource: source,
        };
    }));
    return chunks;
}