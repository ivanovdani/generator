import * as fs from 'fs';


export default class NFTGenerator {

    jsonMap = {}



    constructor(config) {
        this.layers = []
    }

    async generateLayers(path) {

        let folders = fs.readdirSync(path, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        folders.forEach(f => {
            const sa = f.split('_')
            sa[1] = parseInt(sa[1]);
            if(sa[1] && sa[1] != NaN) {
                this.layers.push(new Layer(...sa));
            } else {
                console.log('Invalid folder skipped: ', error);
            }

        });


        this.generateLayerOptions(path)
        console.log(this.layers);
    }

    async generateLayerOptions(path) {
        this.layers.forEach(l => {
            const match = l.match ? '_' + l.match : '';
            const files = fs.readdirSync(`${path}\\${l.name}_${l.zIndex}${match}`, { withFileTypes: false })
            files.forEach(f => {
                const sa0 = f.split('.');
                if(sa0[1] === 'png'){
                    const sa = sa0[0].split('_')
                    sa[1] = parseInt(sa[1]);
                    
                    if(sa[1] && sa[1] != NaN) {
                        l.layerOptions.push(new LayerOption(...sa))
                    } else {
                        console.log('Invalid rarity option');
                    }
                }
                else{
                    console.log('Skipping non image file: ', f);
                }
            });
        });
    }

    async generate(numberOfNFTs) {
        for (let i = 0; i < numberOfNFTs; i++) {
            //pick up layers
            //generate metadata
            //draw and save the img
        }
    }

    async saveLayersToJson() {

    }

    async loadLayersFromJson() {

    }
};

export class Layer {
    constructor(...options) {
        this.name = options[0];
        this.zIndex = options[1];
        if (options.length > 2)
            this.match = options[2];
        this.layerOptions = [];
    }
};

export class LayerOption {
    constructor(file, ...options) {
        this.options = options;
        this.name = options[0];
        this.rarity = options[1];
        this.file = file;
    }
}

/*
name_zIndex_match
name_rarity_style

body         ---|
clothes         | skin 
head        ----|
hair
acs
handitems
background

name_rarity_(M-)color_(M-)style

human - skin color{
    body_0: human_black_25
    head_1_M-body: human_black
}
acs_3_M-body: human_mask_red_10

human:  human alien robot mummy
skin:   4     3     2     1 
clothes:
faces: 
acs_M-body     mask random  mask  display bandage glasses 
items
background

*/