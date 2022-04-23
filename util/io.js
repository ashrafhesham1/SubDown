const inquirer = require('inquirer')

input = async (message=' ') => {
    
    const questions = [
        {
          type: 'input',
          name: 'answer',
          message: message
        }
      ];

    const read = await inquirer.prompt(questions);
    return read.answer;

};

module.exports= input
