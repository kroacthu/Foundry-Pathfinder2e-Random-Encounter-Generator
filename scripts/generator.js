// const { merge } = require("diff");

Hooks.once("init", function(){
    console.log("Random Encounter Generator | Starting up the random generator module");
});




Hooks.on("ready", function(){
    console.log("Random Encounter Generator | All initialization done, ready to run");
    Generator.initialize();
})


class Generator {
    static ID = 'random-encounter-generator';
    static FLAGS = {
        GENERATORFLAG: 'random-encounter-generator-flag'
    }

    static TEMPLATES = {
        GENERATORINTERFACE: `modules/${this.ID}/templates/random-encounter-generator.hbs`
    }

    static log(force, ...args) {  
        const shouldLog = force || game.modules.get('_dev-mode')?.api?.getPackageDebugValue(this.ID);
    
        if (shouldLog) {
          console.log(this.ID, '|', ...args);
        }
      }

      static initialize()
      {
        this.generatorConfig = new GeneratorConfig();
      }

    }
Hooks.once('devModeReady', ({ registerPackageDebugFlag }) => {
    registerPackageDebugFlag(ToDoList.ID);
});
    

// TODO : research how to render button on a different area in the canvas
Hooks.once('renderPlayerList', (playerList, html) =>
{
    // find the element which has our logged in user's id
    const loggedInUserListItem = html.find(`[data-user-id="${game.userId}"]`)
  
    const tooltip = game.i18n.localize('GENERATOR.button-title');

    // insert a button at the end of this element
    loggedInUserListItem.append(
        `<button type='button' class='generator-icon-button flex0' title="${tooltip}">
      <i class='fas fa-tasks'></i>
    </button>`
  );

  
    // register an event listener for this button
    html.on('click', '.generator-icon-button', (event) => {
        Generator.log(true, 'Button Clicked!');

        const userId = $(event.currentTarget).parents('[data-user-id]')?.data()?.userId;

        Generator.generatorConfig.render(true, {userId});
    });
});


class GeneratorData
{
    // all the user input 
    static get allUserRequests() {}


    // TODO: Come back to inspect this later
    // static getUserRequest(userId)
    // {
    //     return Gamepad.users.get(userId)?.getFlag(Generator.ID, Generator.FLAGS.GENERATORFLAG);
    // }

    static createUserRequest(userId, requestData)
    {
        const newRequest = 
        {
            isDone: false,
            ...requestData,
            id: foundry.utils.randomID(16),
            userId,
        }

        const newRequests = 
        {
            [newRequest.id]: newRequest
        }

        return Gamepad.users.get(userId)?.setFlag(Generator.id, Generator.FLAGS.GENERATORFLAG, newRequests)        
    }

    /* Tutorial methods, will look back on whether these are necessary later
  // get all todos for a given user
  static getToDosForUser(userId) {}

  // create a new todo for a given user
  static createToDo(userId, toDoData) {}

  // update a specific todo by id with the provided updateData
  static updateToDo(todoId, updateData) {}

  // delete a specific todo by id
  static deleteToDo(todoId) {}
  */
}

class GeneratorConfig extends FormApplication
{
    static get defaultOptions()
    {
        const defaults = super.defaultOptions;
        const overrides = {
            height: 'auto',
            id: 'generator',
            template: Generator.TEMPLATES.GENERATORINTERFACE,
            title: 'Random Encounter Generator',
            userId: game.userId,
        };
        const mergedOptions = foundry.utils.mergeObject(defaults, overrides);
        return mergedOptions;
    }

    // getData(options)
    // {
    //     return {
    //         generator: GeneratorData.getUserRequest(options.userId)
    //     }
    // }

    async _updateObject(event, formData)
    {
        const expandedData = foundry.utils.expandObject(formData);

        console.log(formData);
        console.log(formData.enemyType);
        Generator.log(false, 'Utilizing', {formData, expandedData})
    }
}

// ---------------
// THIS CODE CAN CREATE ACTORS AND PUTS THEM IN THE CORRECT DIRECTORY
// ---------------
// let actor = await Actor.create({
//     name: "New Test Actor",
//     type: "character",
//     img: "artwork/character-profile.jpg"
//   });


/**
 * The structure of data that will be important to grab for pathfinder.
 * @typedef {Object} TemplateCharacter
 * @property {Int32Array} armorclass - get the AC of a creature
 * @property {Int32Array} hp - get the health points of a creature
 * @property {string} type - get from a list of creature types (will)
 */


// JSON EXAMPLE
// {
//     "prototypeToken": {
//         "displayName": 20,
//         "displayBars": 20,
//         "flags": {
//             "pf2e": {
//                 "linkToActorSize": true,
//                 "autoscale": true
//             }
//         },
//         "height": 1,
//         "width": 1,
//         "name": "npc_test",
//         "actorLink": false,
//         "appendNumber": false,
//         "prependAdjective": false,
//         "texture": {
//             "src": "systems/pf2e/icons/default-icons/npc.svg",
//             "anchorX": 0.5,
//             "anchorY": 0.5,
//             "offsetX": 0,
//             "offsetY": 0,
//             "fit": "contain",
//             "scaleX": 1,
//             "scaleY": 1,
//             "rotation": 0,
//             "tint": "#ffffff",
//             "alphaThreshold": 0.75
//         },
//         "hexagonalShape": 0,
//         "lockRotation": false,
//         "rotation": 0,
//         "alpha": 1,
//         "disposition": -1,
//         "bar1": {
//             "attribute": "attributes.hp"
//         },
//         "bar2": {
//             "attribute": null
//         },
//         "light": {
//             "negative": false,
//             "priority": 0,
//             "alpha": 0.5,
//             "angle": 360,
//             "bright": 0,
//             "color": null,
//             "coloration": 1,
//             "dim": 0,
//             "attenuation": 0.5,
//             "luminosity": 0.5,
//             "saturation": 0,
//             "contrast": 0,
//             "shadows": 0,
//             "animation": {
//                 "type": null,
//                 "speed": 5,
//                 "intensity": 5,
//                 "reverse": false
//             },
//             "darkness": {
//                 "min": 0,
//                 "max": 1
//             }
//         },
//         "sight": {
//             "enabled": false,
//             "range": 0,
//             "angle": 360,
//             "visionMode": "basic",
//             "color": null,
//             "attenuation": 0.1,
//             "brightness": 0,
//             "saturation": 0,
//             "contrast": 0
//         },
//         "detectionModes": [],
//         "occludable": {
//             "radius": 0
//         },
//         "ring": {
//             "enabled": false,
//             "colors": {
//                 "ring": null,
//                 "background": null
//             },
//             "effects": 1,
//             "subject": {
//                 "scale": 1,
//                 "texture": null
//             }
//         },
//         "randomImg": false
//     },
//     "folder": "8bsb8YwubIiK0txf",
//     "name": "npc_test",
//     "type": "npc",
//     "ownership": {
//         "default": 0,
//         "asvv7DOL8SzX3DWR": 3
//     },
//     "effects": [],
//     "system": {
//         "attributes": {
//             "hp": {
//                 "value": 10,
//                 "temp": 0,
//                 "max": 10,
//                 "details": ""
//             },
//             "speed": {
//                 "value": 25,
//                 "otherSpeeds": [],
//                 "details": ""
//             },
//             "ac": {
//                 "value": 10,
//                 "details": ""
//             },
//             "allSaves": {
//                 "value": ""
//             }
//         },
//         "initiative": {
//             "statistic": "perception"
//         },
//         "details": {
//             "languages": {
//                 "value": [],
//                 "details": ""
//             },
//             "level": {
//                 "value": 1
//             },
//             "blurb": "",
//             "publicNotes": "",
//             "privateNotes": "",
//             "publication": {
//                 "title": "",
//                 "authors": "",
//                 "license": "OGL",
//                 "remaster": false
//             }
//         },
//         "resources": {},
//         "_migration": {
//             "version": 0.93,
//             "previous": null
//         },
//         "abilities": {
//             "str": {
//                 "mod": 0
//             },
//             "dex": {
//                 "mod": 0
//             },
//             "con": {
//                 "mod": 0
//             },
//             "int": {
//                 "mod": 0
//             },
//             "wis": {
//                 "mod": 0
//             },
//             "cha": {
//                 "mod": 0
//             }
//         },
//         "perception": {
//             "details": "",
//             "mod": 0,
//             "senses": [],
//             "vision": true
//         },
//         "saves": {
//             "fortitude": {
//                 "value": 0,
//                 "saveDetail": ""
//             },
//             "reflex": {
//                 "value": 0,
//                 "saveDetail": ""
//             },
//             "will": {
//                 "value": 0,
//                 "saveDetail": ""
//             }
//         },
//         "traits": {
//             "value": [],
//             "rarity": "common",
//             "size": {
//                 "value": "med"
//             }
//         }
//     },
//     "_id": "TaDr1T0bTgHJegqm",
//     "img": "systems/pf2e/icons/default-icons/npc.svg",
//     "items": [
//         {
//             "name": "Acrobatics",
//             "type": "lore",
//             "effects": [],
//             "system": {
//                 "description": {
//                     "gm": "",
//                     "value": ""
//                 },
//                 "rules": [],
//                 "slug": null,
//                 "_migration": {
//                     "version": 0.93,
//                     "lastMigration": null
//                 },
//                 "traits": {
//                     "otherTags": []
//                 },
//                 "publication": {
//                     "title": "",
//                     "authors": "",
//                     "license": "OGL",
//                     "remaster": false
//                 },
//                 "mod": {
//                     "value": 3
//                 },
//                 "proficient": {
//                     "value": 0
//                 }
//             },
//             "_id": "62AFvz8VvajbtL8P",
//             "img": "systems/pf2e/icons/default-icons/lore.svg",
//             "folder": null,
//             "sort": 0,
//             "ownership": {
//                 "default": 0,
//                 "asvv7DOL8SzX3DWR": 3
//             },
//             "flags": {},
//             "_stats": {
//                 "compendiumSource": null,
//                 "duplicateSource": null,
//                 "coreVersion": "12.330",
//                 "systemId": "pf2e",
//                 "systemVersion": "6.0.1",
//                 "createdTime": 1722437540328,
//                 "modifiedTime": 1722437546470,
//                 "lastModifiedBy": "asvv7DOL8SzX3DWR"
//             }
//         },
//         {
//             "name": "Arcana",
//             "type": "lore",
//             "effects": [],
//             "system": {
//                 "description": {
//                     "gm": "",
//                     "value": ""
//                 },
//                 "rules": [],
//                 "slug": null,
//                 "_migration": {
//                     "version": 0.93,
//                     "lastMigration": null
//                 },
//                 "traits": {
//                     "otherTags": []
//                 },
//                 "publication": {
//                     "title": "",
//                     "authors": "",
//                     "license": "OGL",
//                     "remaster": false
//                 },
//                 "mod": {
//                     "value": 2
//                 },
//                 "proficient": {
//                     "value": 0
//                 }
//             },
//             "_id": "kANds1zVwH0m6M85",
//             "img": "systems/pf2e/icons/default-icons/lore.svg",
//             "folder": null,
//             "sort": 0,
//             "ownership": {
//                 "default": 0,
//                 "asvv7DOL8SzX3DWR": 3
//             },
//             "flags": {},
//             "_stats": {
//                 "compendiumSource": null,
//                 "duplicateSource": null,
//                 "coreVersion": "12.330",
//                 "systemId": "pf2e",
//                 "systemVersion": "6.0.1",
//                 "createdTime": 1722437562556,
//                 "modifiedTime": 1722437567006,
//                 "lastModifiedBy": "asvv7DOL8SzX3DWR"
//             }
//         }
//     ],
//     "sort": 0,
//     "flags": {},
//     "_stats": {
//         "compendiumSource": null,
//         "duplicateSource": null,
//         "coreVersion": "12.330",
//         "systemId": "pf2e",
//         "systemVersion": "6.0.1",
//         "createdTime": 1722384694501,
//         "modifiedTime": 1722384694501,
//         "lastModifiedBy": "asvv7DOL8SzX3DWR"
//     }
// }