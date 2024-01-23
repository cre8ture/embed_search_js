import { processDocument } from "../loaders/processFiles.js";
// import {embed} from '../embeddings/transformerJsEmbeddings'
import processText from '../embeddings/processEmbeddings.js'
import {VectorStorage} from '../database/vectordb.js'
import {searchVector} from '../search/search.js'



// const vectorStorage = new VectorStorage();
class SingletonVectorStorage {
    static instance = null;

    static async getInstance() {
        if (this.instance === null) {
            this.instance = new VectorStorage();
        }

        return this.instance;
    }
}

if(typeof document !== 'undefined'){
    const fileInput = document.getElementById("fileInput"); // Assuming you have an input element with id "fileInput"
    const submitButton = document.getElementById("submitButton"); // Assuming you have an input element with id "fileInput"
    const queryInput = document.getElementById("query"); // Assuming you have an input element with id "fileInput"
    const submitQuery = document.getElementById("querySubmitButton"); // Assuming you have an input element with id "fileInput"
    const resultsDiv = document.getElementById("results"); // Assuming you have an input element with id "fileInput"
    
    fileInput.addEventListener("change", async function() {
      await handleFiles(this.files);
    });
    
    submitButton.addEventListener("click", function() {
      async function handleSubmit() {
        const text = textArea.value;
        textArea.value = "";
        await handleFiles(text);
      }

    })

    submitQuery.addEventListener("click", async function() {
        const query = queryInput.value;
        queryInput.value = "";
        const vectorStorage = await SingletonVectorStorage.getInstance();
        const results = await searchVector(vectorStorage, query);
        const resultsOfQuery = results.map(result => result);
      
        // Clear previous results
        resultsDiv.innerHTML = '';
      
        // Create a new list item for each result
        resultsOfQuery.forEach(result => {
          const listItem = document.createElement('li');
          listItem.textContent = `Text: ${result.text}, Source: ${result.source}`;
          listItem.addEventListener('click', () => {
            listItem.textContent += `, Vector: ${result.vector}`;
          });
          resultsDiv.appendChild(listItem);
        });
      
        if (resultsDiv.textContent.trim() === '') {
          resultsDiv.classList.add('hidden');
        } else {
          resultsDiv.classList.remove('hidden');
        }
      
        console.log("me results are", resultsOfQuery);
      });
    
}
    async function handleFiles(files) {
      for (const file of files) {
        const chunk = await processDocument(file);
        console.log("me chunk is", chunk)

        const embedding = await processText(chunk, file?.name || "unknown");

        console.log("me embedding is", embedding)

        SingletonVectorStorage.getInstance().then((vectorStorage) => {

        vectorStorage.addChunk(embedding);            

      })
    const vectorStorage = await SingletonVectorStorage.getInstance();
    await vectorStorage.addChunk(embedding);
    }
}