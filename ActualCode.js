// Explanation of variables used in function

// element
// a container in which sentences to be write
// texts_array
// Array of sentences which are to be write on html
// stable sentence
// sentence which will not be modified and shown as it is
// text_index
// Index of a sentence to be typed in the array of texts
// character_index
// Index of a character to be typed in a sentence
// text_to_write
// the sentence we will write on html, initially a first sentence in the array
// write_delay
// delay in starting to write each sentence
// remove_delay
// delay before removing text from html
// write_speed_per_character
// delay in writing each character
// remove_speed_per_character
// delay in removing each character


function typed_js_lite(element, texts_array, stable_text = '', write_delay = 500, remove_delay = 500, write_speed_per_character = 100, remove_speed_per_character = 100) {

    let text_index = 0;
    let character_index = 0;
    let text_to_write;
    element.innerHTML=stable_text;
    // function which will write sentence on output screen
    function text_typer() {

        text_to_write = texts_array[text_index];
        // total characters in text
        let characters_in_text = text_to_write.length;
        // id of setInterval which will call function to type character
        let character_typer_interval = setInterval(character_typer, write_speed_per_character);
        // function to type each character
        function character_typer() {
            element.innerHTML += text_to_write[character_index++];
            // stop writing character when characters are finished and call function to remove typed sentence after the remove_delay
            if (character_index === characters_in_text) {
                clearInterval(character_typer_interval);
                setTimeout(text_remover, remove_delay);
            }
        }

    }

    // function to remove sentence
    function text_remover() {
        // setInterval id of characters remover function
        let character_remover_interval = setInterval(character_remover, remove_speed_per_character);

        // function to remove characters
        function character_remover() {

            element.innerHTML = stable_text + text_to_write.slice(0, --character_index);

            // when all characters removed, move to next sentence in text array and call function to write sentence after the writing delay
            if (character_index === 0) {
                clearInterval(character_remover_interval);

                // to move cyclically on array
                text_index = (text_index+1)%texts_array.length;
                setTimeout(text_typer, write_delay);
            }
        }
    }
    setTimeout(text_typer, write_delay);
}


// Example to illustrate the use of function
let container_to_write_in = document.getElementById('container_to_write_in');
let array_of_senteneces = ['Web Developer', 'Web Designer', 'Front-End Developer', 'Backed Developer'];
let stable_text_with_each_sentence='I am a ';

typed_js_lite(container_to_write_in,array_of_senteneces,stable_text_with_each_sentence);