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

    static getUserRequest(userId)
    {
        return Gamepad.users.get(userId)?.getFlag(Generator.ID, Generator.FLAGS.GENERATORFLAG);
    }

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

    getData(options)
    {
        return {
            generator: GeneratorData.getUserRequest(options.userId)
        }
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