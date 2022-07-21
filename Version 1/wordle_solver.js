const { create } = require('domain');
const {readFileSync, promises: fsPromises, read} = require('fs');
const { listenerCount, connected } = require('process'); //idk this syntax

function create_masterlist(filename){
    //creates a masterlist which we will copy from for each iteration of the World problem
    //sort the master list as well.
    const file_contents = readFileSync(filename, 'utf-8');
    let masterlist = file_contents.split(/\r?\n/);
    let l = masterlist.sort()
    return l;
}

function remove_unmatched_words_green(green, list, i, m){
    if (green[0] != ""){
        while (i < m){
            let b = list[i]; // for debugging purposes
            if (green[0] != list[i][0]){
                list.splice(i, 1); //idk if this is correct syntax
                m--;
                i--;
            }
            i++;
        }
    }
    i = 0; m = list.length;
    if (green[1] != ""){
        while (i < m){
            let b = list[i]; // for debugging purposes
                if (green[1] != list[i][1]){
                    list.splice(i, 1); //idk if this is correct syntax
                    m--;
                    i--;
                }
                i++;
            }
    }
    i = 0; m = list.length;
    if (green[2] != ""){
        while (i < m){
            let b = list[i]; // for debugging purposes
                if (green[2] != list[i][2]){
                    list.splice(i, 1); //idk if this is correct syntax
                    m--;
                    i--;
                }
                i++;
            }
    }

    i = 0; m = list.length;
    if (green[3] != ""){
        while (i < m){
            let b = list[i]; // for debugging purposes
                if (green[3] != list[i][3]){
                    list.splice(i, 1); //idk if this is correct syntax
                    m--;
                    i--;
                }
                i++;
            }
        
    }
    i = 0; m = list.length;
    if (green[4] != ""){
        while (i < m){
            let b = list[i]; // for debugging purposes
                if (green[4] != list[i][4]){
                    list.splice(i, 1); //idk if this is correct syntax
                    m--;
                    i--;
                }
                i++;
            }
        
    }
    return list;
}

function remove_unmatched_words_yellow(yellow, list, i, m){
    for (let t = 0; t < 5; t++){
        for (let k = 0; k < yellow[t].length; k++){
            m = list.length; i = 0;
            if (yellow[t][k] != ""){
                while (i < m){
                    let e = yellow[t][k];
                    if ((yellow[t][k] == list[i][0] || yellow[t][k] == list[i][1] || yellow[t][k] == list[i][2] || yellow[t][k] == list[i][3] || yellow[t][k] == list[i][4]) && (yellow[t][k] != list[i][t])){
                        i++;
                    }
                    else{
                        list.splice(i, 1); m = list.length;
                    }
                }
            }
        }
    }
    return list;

}

function remove_grey_letters(grey, list, i, m){
    let yellow = grey;
    for (let t = 0; t < grey.length; t++){
        while (i < m){
            let d = list[i];
            let e = yellow[t];
            if (yellow[t] == list[i][0]){
                list.splice(i, 1);
                i--;
            }
            else if (yellow[t] == list[i][1]){
                list.splice(i, 1);
                i--;
            }
            else if (yellow[t] == list[i][2]){
                list.splice(i, 1);
                i--;
            }
            else if (yellow[t] == list[i][3]){
                list.splice(i, 1);
                i--;
            }
            else if (yellow[t] == list[i][4]){
                list.splice(i, 1);
                i--;
            } i++; m = list.length;
        }
        i = 0; m = list.length;
    }

    return list;
}
function wordle_solver(grey, green, yellow, masterlist){
    // green -> a list of letters in the correct place
    // yellow -> list of letters that are supposed to be in the word

    // green = ["", "g", "", "", "y"];
    // yellow = ["l"]

    let list = masterlist;

    let i = 0; let m = list.length;
    list = remove_grey_letters(grey, list, i, m);


    i = 0; m = list.length;
    list = remove_unmatched_words_green(green, list, i, m);

    i = 0; m = list.length;
    list = remove_unmatched_words_yellow(yellow, list, i, m);

    return list;

}

function random_word_generator(list){
    return list[Math.round(Math.random() * 5757)];

}

function cmp_guess_and_word(grey, green, yellow, guess, word){

    for (let i = 0; i < 5; i++){
        for (let k = 0; k < 5; k++){
            if (guess[i] == word[k] && (i == k)){
                green[i] = guess[i];
            }
            else if(guess[i] == word[k]){
                yellow[i].push(guess[i]);
            }
            else{
                if (k == 4 && letter_not_in_green(guess[i], green, yellow) == true){
                    grey += guess[i];
                }
            }
        }
    }


    for (i = 0; i < green.length; i++){
        for (k = 0; k < yellow[i].length; k++){
            if (green[i] == yellow[i][k]){
                yellow[i].splice(k,1);
            }
        }
    }
    
    return [grey, green, yellow];
}

function letter_not_in_green(letter, green, yellow){
    for (let i = 0; i < 5; i++){
        if (letter == green[i]){
            return false;
        }
        else if (letter == yellow[i]){
            return false
        }
    }
    return true;
}

function test_this_mofo(){
    let stats = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,];

    for (let i = 0; i < 10000; i++){
        let poo = create_masterlist("5_letter_words.txt");
        let masterlist = create_masterlist("5_letter_words.txt");
        let green = ["", "", "", "", ""];
        let yellow = [[], [], [], [], []]
        let grey = "";
        let word = "spear"//random_word_generator(poo);
        let ggy = cmp_guess_and_word(grey, green, yellow, "mares", word);
        let guess = wordle_solver(ggy[0], ggy[1], ggy[2], masterlist)[0];

        let num_guesses = 2;
        while (guess != word){
            ggy = cmp_guess_and_word(ggy[0], ggy[1], ggy[2], guess, word);
            guess = wordle_solver(ggy[0], ggy[1], ggy[2], masterlist)[0];
            num_guesses++;
        }
        stats[num_guesses] += 1;

    }
    return stats;
}


var b = test_this_mofo();