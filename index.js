import NFTGenerator from "./nft-generator.js";
import {fileURLToPath} from 'url';
import path from 'path';



function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    let nftG = new NFTGenerator({});
    nftG.generateLayers(path.join(__dirname, 'files'))
    
}

main();

