const HashMap = require('./HashMap');
const HashMapChain = require('./HashMapChain');

function main() {
    const lotr = new HashMap();
    HashMap.MAX_LOAD_RATIO = 0.5;
    HashMap.SIZE_RATIO = 3;
    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollumn");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");
    console.log(lotr._hashTable);

    //There appears to be no discrepancy, however it only seems to provide the most recent value of the key
    console.log(lotr.get("Maiar"));
    console.log(lotr.get("Hobbit"))
    //The capacity is 24, which is a mulitple of the established size ratio.  This should increase by the ratio everytime the capacity is exceeded
    console.log(lotr._capacity);

    const numHash = new HashMap(11);
    numHash.set(10, 'number');
    numHash.set(22, 'number1');
    numHash.set(31, 'number2');
    numHash.set(4, 'number3');
}

//main();

// This should create two different hash maps both with the same keys.
// Since the keys are the same string value, that hashes should start at the same location, though the second key will be placed after
// Though similar, the console logged values will be different due to the order of the hashing for both hash maps
const WhatDoesThisDo = function() {
    // Keys, same keys
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    // Make new hash map
    let map1 = new HashMap();
    // Set the key value pairs into the hash map
    map1.set(str1,10);
    map1.set(str2,20);
    // New hash map
    let map2 = new HashMap();
    // Keys; same as the above
    let str3 = str1;
    let str4 = str2;
    // Set key value pairs into the hash map, but in reverse
    map2.set(str3,20);
    map2.set(str4,10);

    //Should display 20
    console.log(map1.get(str1));
    //Should display 10
    console.log(map2.get(str3));
}
//This is due to the order, and the function for get will naturally seek until the end of the matching list and return the most recent one
//hatDoesThisDo();

/*
    3).
    Open Addressing
        0: 22
        1: 88
        2: 
        3: 
        4: 4
        5: 15
        6: 28
        7: 17
        8: 59
        9: 31
        10: 10

    Separate Chaining
        0:
        1: 28, 19, 10
        2: 20
        3: 12
        4:
        5: 5, 33
        6: 15
        7:
        8: 17
*/

// 4). Duplicates
function removeDuplicates(str) {
    return str
    .split('')
    .filter((char, index, self) => {
        return self.indexOf(char) === index;
    })
    .join('');
}

// 5). Palindrome
function palingram(str) {
    let letterCount = {}
    for (let i = 0; i < str.length; i++) {
        let char = str.charAt(i);

        let count = letterCount[char]

        letterCount[char] = count ? ++count : 1;
    }
    let oddSlot = false;
    for (const [key, value] of Object.entries(letterCount)) {
        if (value % 2 === 1) {
            if (str.length % 2 === 0 || oddSlot) {
                return false;
            }
            oddSlot = true;
        }
    }
    return true;
}

// 6). Anagram grouping O(N^3): length of array, length of each string compared to other strings
function anagramGroup(givenList) {
    const list = givenList;
    const newList = [];
    let tick = 0;
    // first string
    for (let i = 0; i < list.length; i++) {
        // anagram category
        let subArr = [list[i]];
        // compare current string to other strings
        for (let j = i + 1; j < list.length; j++) {
            // strings match length
            if (list[j].length === list[i].length) {
                let match = true;
                // check letters match
                for (let letter = 0; letter < list[i].length; letter++) {
                    if (!list[j].includes(list[i][letter])) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    // push list into anagram category
                    subArr.push(list[j]);
                    list.splice(j, 1);
                    // skip over to next string
                }
            }
        }
        newList.push(subArr);
    }
    console.log(tick);
    return newList;
}

// 7). Separate Chains
function testSeparateChain() {
    const lotr = new HashMapChain();
    HashMapChain.MAX_LOAD_RATIO = 0.5;
    HashMapChain.SIZE_RATIO = 3;
    lotr.set("Hobbit", "Bilbo");
    lotr.set("Hobbit", "Frodo");
    lotr.set("Wizard", "Gandalf");
    lotr.set("Human", "Aragorn");
    lotr.set("Elf", "Legolas");
    lotr.set("Maiar", "The Necromancer");
    lotr.set("Maiar", "Sauron");
    lotr.set("RingBearer", "Gollumn");
    lotr.set("LadyOfLight", "Galadriel");
    lotr.set("HalfElven", "Arwen");
    lotr.set("Ent", "Treebeard");
    console.log(lotr._hashTable);

    console.log(lotr.get("Maiar"));
    console.log(lotr.get("Hobbit"))
    console.log(lotr._capacity);
}
testSeparateChain();