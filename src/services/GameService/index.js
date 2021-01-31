class GameService {
  static RULES = ({
    rock: { name: 'Rock', defeats: 'scissors' },
    paper: { name: 'Paper', defeats: 'rock' },
    scissors: { name: 'Scissors', defeats: 'paper' },
  })

  static getComputerChoice = () => {
    const choices = Object.keys(this.getRules())

    return choices[Math.floor((Math.random() * choices.length))]
  }

  static decide = (fPlayer, sPlayer, fChoice, sChoice) => {
    if (fChoice === sChoice) {
      return 'DRAW';
    }

    const fChoiceRule = this.RULES[fChoice];

    if (fChoiceRule.defeats === sChoice) {
      return `${fPlayer} WIN`
    }

    return `${sPlayer} WIN`
  }

  static validatePlayer = async (room, userName, choice) => {
    if (!Object.keys(this.RULES).includes(choice)) {
      throw Error('Choice does not exists').message
    }

    const {
      playerOneUsername, playerTwoUsername, histories,
    } = room

    if (firstPlayer === userName) {
      if (!firstPlayerChoice) {
        return 'firstPlayer'
      }

      throw Error('You cannot choose other choice again').message
    }

    if (secondPlayer === userName) {
      if (!secondPlayerChoice) {
        return 'secondPlayer'
      }

      throw Error('You cannot choose other choice again').message
    }

    throw Error('You are not player in this room').message
  }

  static getResult = async (room) => {
    const {
      firstPlayer, secondPlayer, firstPlayerChoice, secondPlayerChoice,
    } = room

    if (firstPlayerChoice && secondPlayerChoice) {
      const result = this.decide(firstPlayer, secondPlayer, firstPlayerChoice, secondPlayerChoice)

      return result
    }

    return 'waiting other player to play'
  }
}

export default GameService
