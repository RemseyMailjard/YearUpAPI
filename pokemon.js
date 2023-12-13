"use strict";

class Pokemon {
  constructor(data) {
    this.name = data.name;
    this.weight = data.weight;
    this.height = data.height;
    this.types = data.types.map((typeInfo) => typeInfo.type.name);
    this.abilities = data.abilities.map(
      (abilityInfo) => abilityInfo.ability.name
    );
    // Add more properties as needed
  }

  displayInfo() {
    console.log(`Name: ${this.name}`);
    console.log(`Weight: ${this.weight} kgs`);
    console.log(`Height: ${this.height} decimetres`);
    console.log(`Types: ${this.types.join(", ")}`);
    console.log(`Abilities: ${this.abilities.join(", ")}`);
    // Add more information display as needed
  }
}

// Call the function
producePoke();

// Using an async function to produce a pokemon fetch request
async function producePoke() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/eevee");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let myPokeData = await response.json();
    let myPoke = new Pokemon(myPokeData);
    myPoke.displayInfo();
  } catch (error) {
    console.log("Error:", error.message);
  }
}
