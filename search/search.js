import { embed } from "../embeddings/transformerJsEmbeddings.js";

export async function searchVector(vectorStorage, text) {
    // Check if vector is in storage
    // const items = await vectorStorage.getAllVectors();
    // console.log("me items are", items)
    // let queryVector = items.find(item => item.serializableVector.data === text);
  
    // If vector is not in storage, embed the query
    // if (!queryVector) {
    const queryVector = await embed(text);
    // }
  
    // Perform search using vectorStorage
    const k = 5; // Number of similar vectors to find
    const results = await vectorStorage.searchByCosineSimilarity(queryVector, k);
  
    return results;
}